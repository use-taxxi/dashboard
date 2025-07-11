# Taxxi Dashboard

A modern tax dashboard web application with a React frontend and Python Flask backend.

---

## Project Structure

```
dashboard/
│
├── backend/                # Flask API backend
│   ├── app.py              # Main Flask application
│   └── requirements.txt    # Python dependencies
│
├── frontend/     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   ├── Header.js
│   │   │   ├── Dashboard.js
│   │   │   └── widgets/
│   │   │       ├── TaxPlanWidget.js
│   │   │       ├── TaxHealthWidget.js
│   │   │       ├── RAndDCreditsWidget.js
│   │   │       ├── DataImportWidget.js
│   │   │       ├── ComplianceWidget.js
│   │   │       ├── CalendarWidget.js
│   │   │       └── AdvisoryWidget.js
│   │   └── App.js
│   └── package.json
│
└── README.md               # Project documentation
```

---

## Backend Setup (Flask)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   conda create --name dashboard python=3.10 nodejs
   conda activate dashboard
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask app:
   ```bash
   python app.py
   ```

---

## Frontend Setup (React)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

---

## Backend Requirements (`backend/requirements.txt`)
```
flask
flask-cors
```

---

## Notes
- Ensure the Flask backend is running on port 5000 (default) and the React frontend on port 3000 (default).
- The frontend fetches data from the backend at `http://localhost:5000/api/dashboard/summary`.
- You may need to adjust CORS settings if accessing from a different host or port. 

---

## Tax Health Score Feature

- The backend fetches the latest tax health answers for a user from Supabase (`tax_health_answers` table) and computes the tax health score, status, description, and breakdown.
- The frontend widget (`TaxHealthWidget.js`) displays the score and breakdown based on the data returned by the backend (it does not recalculate the score).
- Set your Supabase credentials in your environment:
  ```
  SUPABASE_URL=your_supabase_url
  SUPABASE_KEY=your_supabase_key
  ```
- The frontend fetches data from `/api/tax-health-answers?user_id=USER_ID` and displays the computed tax health score and details.
