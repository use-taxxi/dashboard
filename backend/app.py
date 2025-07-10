from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)
