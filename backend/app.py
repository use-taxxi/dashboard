from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import certifi
os.environ["SSL_CERT_FILE"] = certifi.where()
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()
from utils.tax_health import calculate_tax_health_score

app = Flask(__name__)
CORS(app)

# Supabase client initialization
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


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

# New endpoint to fetch latest tax health answers by user_id
@app.route('/api/tax-health-answers')
def tax_health_answers():
    user_id = request.args.get('user_id')
    print('User ID:', user_id)
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        # Fetch the latest answer for the user from the tax_health_answers table
        response = (
            supabase.table("tax_health_answers")
            .select("*")
            .eq("user_id", user_id)
            .execute()
        )
        print('Supabase response:', response)
        data = response.data[0] if response.data else {}
        print('Fetched data:', data)
        if data:
            tax_health = calculate_tax_health_score(data)
            data['tax_health'] = tax_health
        return jsonify(data)
    except Exception as e:
        import traceback
        print('Error in /api/tax-health-answers:', e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
