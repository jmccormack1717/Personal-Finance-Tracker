# Personal Finance Tracker

A simple and intuitive personal finance tracker that helps you manage your income, expenses, and savings. Track your spending habits, categorize transactions, and visualize your financial health with interactive charts.

---

## Features
- Add, edit, and delete transactions  
- Categorize expenses (e.g., Food, Rent, Entertainment)  
- Track income and savings goals  
- View spending summaries by category  
- Interactive charts for monthly trends  
- Secure user authentication (login/signup)  
- Responsive design (mobile + desktop)  

---

## Tech Stack
- **Frontend:** React + TailwindCSS  
- **Backend:** FastAPI (Python)  
- **Database:** PostgreSQL (or SQLite for local dev)  
- **Authentication:** JWT-based auth  
- **Deployment:** Docker + Render/AWS/Heroku  

---

## Project Structure
finance-tracker/
│── frontend/ # React app
│ ├── src/
│ ├── public/
│ └── package.json
│
│── backend/ # FastAPI app
│ ├── app/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── schemas/
│ │ └── main.py
│ └── requirements.txt
│
│── docker-compose.yml
│── README.md
