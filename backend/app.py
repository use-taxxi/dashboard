from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import certifi
os.environ["SSL_CERT_FILE"] = certifi.where()
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()
from utils.tax_health import calculate_tax_health_score
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Change this in production
jwt = JWTManager(app)

# Supabase client initialization
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# In-memory user store: {email: {id, email, password_hash}}
users = {}

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'msg': 'Email and password required'}), 400
    if email in users:
        return jsonify({'msg': 'User already exists'}), 400
    user_id = str(uuid.uuid4())
    users[email] = {
        'id': user_id,
        'email': email,
        'password_hash': generate_password_hash(password)
    }
    access_token = create_access_token(identity=user_id)
    return jsonify({'access_token': access_token, 'user_id': user_id}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = users.get(email)
    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({'msg': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=user['id'])
    return jsonify({'access_token': access_token, 'user_id': user['id']}), 200


@app.route('/api/dashboard/summary')
def dashboard_summary():
    return jsonify({
        "company_name": "COMPANY NAME",
        "tax_plan": {"amount": 24750, "savings": -8200},
        "tax_health": {"score": 68, "status": "Good Tax Health", "desc": "Some risks but manageable"},
        "rnd_credits": {"amount": 12000, "badge": "Potential"},
        "data_import": {"connected": 3, "total": 4, "percent": 75},
        "compliance": {"alerts": 3, "critical": 1, "warning": 2, "compliant": 5},
        "calendar": {"deadlines": 2},
        "advisors": [
            {"name": "Tax Advisor Name, CPA", "role": "Your dedicated tax advisor"},
            {"name": "Name, Role", "role": "Lorem ipsum dolor sit amet"}
        ]
    })

# Example: Protect the tax health endpoints
@app.route('/api/tax-health-answers', methods=['GET', 'POST'])
@jwt_required()
def tax_health_answers():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        try:
            # Fetch the latest answer for the user from the tax_health_answers table
            response = (
                supabase.table("tax_health_answers")
                .select("*")
                .eq("user_id", user_id)
                .order("created_at", desc=True)
                .limit(1)
                .execute()
            )
            data = response.data[0] if response.data else {}
            if data:
                tax_health = calculate_tax_health_score(data)
                data['tax_health'] = tax_health
            return jsonify(data)
        except Exception as e:
            import traceback
            print('Error in /api/tax-health-answers:', e)
            traceback.print_exc()
            return jsonify({'error': str(e)}), 500
    elif request.method == 'POST':
        try:
            payload = request.get_json()
            payload['user_id'] = user_id
            # Insert the new tax health answer for the user
            response = supabase.table("tax_health_answers").insert(payload).execute()
            return jsonify({'msg': 'Saved tax health answers for user', 'user_id': user_id}), 200
        except Exception as e:
            import traceback
            print('Error in /api/tax-health-answers POST:', e)
            traceback.print_exc()
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
