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
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
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
   cd dashboard-frontend
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
