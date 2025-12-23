# ☕ Café Fausse - Restaurant Web Application

A full-stack fine dining restaurant web application featuring a React frontend with Flask backend and PostgreSQL database for table reservations and newsletter management.

**<mark>&nbsp;CURRENTLY THIS PROJECT IS ONLY RUN LOCALLY&nbsp;</mark>**

![Café Fausse](https://img.shields.io/badge/React-18.3.1-blue) ![Flask](https://img.shields.io/badge/Flask-3.0.0-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Environment Setup](#environment-setup)
- [Database Configuration](#database-configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security Considerations](#security-considerations)
- [Additional Notes](#additional-notes)
- [Support](#support)
- [License](#license)
- [Acknowledgements](#acknowledgements)

<a id="project-overview"></a>
## 🎯 Project Overview

Café Fausse is a web application designed for a fine dining establishment, providing customers and visitors to the website with:
- Restaurant information and menu browsing.
- Online table reservations with real-time availability.
- Newsletter subscription.
- Gallery showcase with awards and reviews.

**Restaurant Details:**
- **Address**: 1234 Culinary Ave, Suite 100, Washington, DC 20002
- **Phone**: (202) 555-4567
- **Hours**: 
  - Monday - Saturday: 5:00 PM - 11:00 PM
  - Sunday: 5:00 PM - 9:00 PM

<a id="features"></a>
## ✨ Features

### Customer-Facing Features
- **Home Page**: Welcome message, restaurant highlights and contact information.
- **Menu Page**: Complete menu with categories (Starters, Main Courses, Desserts, Beverages).
- **Reservations System**: Real-time table booking with availability checking (30 tables).
- **About Us Page**: Restaurant history, founder profiles and mission statement.
- **Gallery Page**: Image showcase with lightbox viewer, awards and customer testimonials.
- **Newsletter Signup**: Email subscription with validation.

### Technical Features
- Responsive design for mobile, tablet and desktop
- Real-time form validation
- Double-booking prevention
- Secure database storage
- RESTful API architecture
- CORS-enabled backend

<a id="technology-stack"></a>
## 🛠️ Technology Stack

### Frontend
- **React** 18.3.1 - UI Framework
- **React Router DOM** 7.11.0 - Client-Side Routing
- **Axios** 1.13.2 - HTTP Client
- **CSS3** - Styling (Flexbox & Grid)

### Backend
- **Flask** 3.0.0 - Python Web Framework
- **Flask-CORS** 4.0.0 - Cross-Origin Resource Sharing
- **psycopg2-binary** 2.9.9 - PostgreSQL Adapter

### Database
- **PostgreSQL** 18 - Relational Database

### Development Tools
- **Node.js** 14+ (used 22.16.0) - JavaScript Runtime
- **Python** 3.8+ (used 3.13.3) - Backend Runtime
- **npm** 10.9.2 - Package Manager
- **pip** 25.3 - Python Package Manager

<a id="prerequisites"></a>
## 📦 Prerequisites

Before installation, ensure you have the following installed:

### Required Software

1. **Node.js & npm**
   - Download: https://nodejs.org/ (LTS version recommended)
   - Verify installation:
     ```bash
     node --version  # Should be v14 or higher
     npm --version   # Should be v6 or higher
     ```

2. **Python**
   - Download: https://www.python.org/downloads/ (3.8 or higher)
   - Verify installation:
     ```bash
     python --version  # Should be 3.8 or higher
     pip --version
     ```

3. **PostgreSQL**
   - Download: https://www.postgresql.org/download/
   - Version: 12 or higher recommended.
   - **Important**: Remember the password you set during installation.

4. **pgAdmin 4** (Optional but recommended)
   - Included with PostgreSQL installation.
   - Used for database management and viewing data.

<a id="installation-guide"></a>
## 🚀 Installation Guide

### Step 1: Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd Web-Application-and-Interface-Design

# If downloaded as ZIP
# Extract the ZIP file and navigate to the folder
cd Web-Application-and-Interface-Design
```

### Step 2: Install Frontend Dependencies

```bash
# Install all React dependencies
npm install

# Verify installation
npm list react react-dom react-router-dom axios
```

**Expected packages:**
- react@10.9.2
- react-dom@18.3.1
- react-router-dom@7.11.0
- axios@1.13.2
- react-scripts@5.0.1

### Step 3: Install Backend Dependencies

```bash
# Navigate to server directory
cd server

# Create Python virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell):
venv\Scripts\activate

# On Windows (Command Prompt):
venv\Scripts\activate.bat

# On macOS/Linux:
source venv/bin/activate

# Your prompt should now show (venv)

# Install Python dependencies
pip install -r requirements.txt

# Verify installation
pip list
```

**Expected packages:**
- Flask==3.0.0
- Flask-CORS==4.0.0
- psycopg2-binary==2.9.9
- python-dotenv==1.0.0

<a id="environment-setup"></a>
## ⚙️ Environment Setup

### Frontend Configuration

The frontend is configured to make API calls to `http://localhost:5000`. This is set up in:

**`src/components/Footer.js`** (line 22):
```javascript
const response = await axios.post('http://localhost:5000/api/newsletter', { email });
```

**`src/pages/Reservations.js`** (line ~48):
```javascript
const response = await axios.post('http://localhost:5000/api/reservations', {...});
```

**No changes needed unless deploying to production.**

### Backend Configuration

**Important**: You must configure your PostgreSQL credentials before running the backend.

1. **Open `server/database.py`**
2. **Locate the `DB_CONFIG` Dictionary** (around lines 5-10):

```python
DB_CONFIG = {
    'host': 'localhost',
    'database': 'cafe_fausse',
    'user': 'postgres',
    'password': 'your_password',  # ← CHANGE THIS!
    'port': 5432
}
```

3. **Update the Password** to match your PostgreSQL installation password

**Example:**
```python
DB_CONFIG = {
    'host': 'localhost',
    'database': 'cafe_fausse',
    'user': 'postgres',
    'password': 'postgres',  # Your actual password
    'port': 5432
}
```
<a id="database-configurationw"></a>
## 💾 Database Configuration

### Step 1: Ensure PostgreSQL is Running

**Windows:**
1. Press `Win + R`, type `services.msc`, press Enter
2. Find **"postgresql-x64-18"** (or your version)
3. Ensure Status shows **"Running"**
4. If not, right-click → **Start**

**macOS:**
```bash
brew services start postgresql@18
```

**Linux:**
```bash
sudo systemctl start postgresql
sudo systemctl status postgresql
```

### Step 2: Initialise Database

From the `server` directory with virtual environment activated:

```bash
# Make sure you're in the server directory
cd server

# Ensure virtual environment is activated
# Your prompt should show (venv)

# Run database initialization script
python database.py
```

**Expected Output:**
```
Database 'cafe_fausse' created successfully
Database tables created successfully
```

### Step 3: Verify Database Creation

**Using pgAdmin:**
1. Open **pgAdmin 4**
2. Connect to **PostgreSQL 18** server
3. Expand **Databases** → You should see **cafe_fausse**
4. Expand **cafe_fausse** → **Schemas** → **public** → **Tables**
5. Verify two tables exist:
   - **customers** (**five columns**: customer_id, customer_name, email, phone_number, newsletter_signup, created_at)
   - **reservations** (**six columns:** reservation_id, customer_id, time_slot, table_number, guests, created_at)

**Using SQL Query:**
```sql
-- Connect to cafe_fausse database in Query Tool
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should return: customers, reservations
```

### Database Schema Details

**customers table:**
```sql
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    newsletter_signup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**reservations table:**
```sql
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER NOT NULL,
    guests INTEGER DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_table_time UNIQUE (table_number, time_slot)
);
```

<a id="running-the-application"></a>
## ▶️ Running the Application

You need **TWO Terminal Windows** running simultaneously.

### Terminal 1: Start Backend Server

```bash
# Navigate to server directory
cd server

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Start Flask server
python app.py
```

**Expected Output:**
```
Database tables created successfully
 * Serving Flask app 'app'
 * Debug Mode: on

WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://127.0.0.1:5000
 
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: XXX-XXX-XXX
```

**Backend is now running on**: `http://localhost:5000`

### Terminal 2: Start Frontend Server

Open a **NEW Terminal Window** (keep backend running):

```bash
# Navigate to project root directory
cd Web-Application-and-Interface-Design

# Start React development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view web-application-and-interface-design in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

**Frontend is now running on**: `http://localhost:3000`

### Accessing the Application

1. Open your web browser.
2. Navigate to: `http://localhost:3000`.
3. You should see: The Café Fausse home page.

**Keep both terminal windows running** while using the application.

<a id="testing"></a>
## 🧪 Testing

### Backend Tests

**Test Newsletter API:**
```bash
# Using curl
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Expected response:
{"message":"Successfully subscribed to newsletter!"}
```

**Test Reservations API:**
```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"202-555-1234",
    "timeSlot":"2025-12-25 19:00:00",
    "guests":4
  }'

# Expected response:
{"message":"Reservation confirmed! Your table number is 15.","reservationId":1,"tableNumber":15,"timeSlot":"2025-12-25 19:00:00"}
```

**Test Health Check:**
```bash
curl http://localhost:5000/health

# Expected response:
{"status":"healthy"}
```

#### Database Tests

**View Newsletter Subscribers:**
```sql
SELECT * FROM customers WHERE newsletter_signup = true;
```

**View All Reservations:**
```sql
SELECT 
    c.customer_name,
    c.email,
    r.time_slot,
    r.table_number,
    r.guests
FROM reservations r
JOIN customers c ON r.customer_id = c.customer_id
ORDER BY r.time_slot;
```

**Test Table Availability:**
```sql
-- Check available tables for specific time slot
SELECT table_number 
FROM reservations 
WHERE time_slot = '2025-12-25 19:00:00';
```

### Automated Testing (Optional)

**Frontend Tests:**
```bash
npm test
```

**Backend Tests:**
```bash
# In server directory with venv activated
pip install pytest
pytest
```

<a id="troubleshooting"></a>
## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

<a id="project-structure"></a>
## 📁 Project Structure

```
Web-Application-and-Interface-Design/
│
├── 📂 public/                          
│   └──  index.html                      # Main HTML template
│
├── 📂 src/                             # React application source code
│   │
│   ├── 📂 assets/                      # Static assets (images, fonts, etc.)
│   │   └── 📂 imgs/                    # Image files
│   │
│   ├── 📂 components/                  # Reusable React components
│   │   ├── Footer.js                   # Footer with newsletter signup
│   │   ├── Lightbox.js                 # Image lightbox/modal component
│   │   └── Navbar.js                   # Navigation bar with mobile menu
│   │
│   ├── 📂 pages/                       # Page-level components (routes)
│   │   ├── About.js                    # About Us page
│   │   ├── Gallery.js                  # Gallery with awards & reviews
│   │   ├── Home.js                     # Landing/home page
│   │   ├── Menu.js                     # Restaurant menu display
│   │   └── Reservations.js             # Table booking form
│   │
│   ├── 📂 styles/                      # CSS stylesheets
│   │   ├── About.css                   # About page styles
│   │   ├── App.css                     # Global application styles
│   │   ├── Footer.css                  # Footer component styles
│   │   ├── Gallery.css                 # Gallery page styles
│   │   ├── Home.css                    # Home page styles
│   │   ├── Menu.css                    # Menu page styles
│   │   ├── Navbar.css                  # Navbar component styles
│   │   └── Reservations.css            # Reservations page styles
│   │
│   ├── App.js                          # Main app component with routing
│   └── index.js                        # React entry point
│
├── 📂 server/                          # Flask backend application
│   ├── 📂 __pycache__/                 # Python bytecode cache (gitignored)
│   ├── 📂 venv/                        # Python virtual environment (gitignored)
│   │
│   ├── app.py                          # Main Flask application & API routes
│   ├── database.py                     # Database configuration & initialization
│   ├── models.py                       # Database models & business logic
│   └── requirements.txt                # Python dependencies
│
├── 📂 node_modules/                    # npm packages (gitignored)
│
├── 📂 docs/                            # Project documentation
│
├── 📂 database/                        # Database schemas/backups (optional)
│
├── .gitignore                          # Git ignore rules
├── LICENSE                             # MIT license file
├── package.json                        # Node.js dependencies & scripts
├── package-lock.json                   # Locked dependency versions
└── README.md                           # Project documentation (this file)
```

<a id="api-documentation"></a>
## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Newsletter Signup

**POST** `/api/newsletter`

Subscribe an email to the newsletter.

**Request Body:**
```json
{
  "email": "customer@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Successfully subscribed to newsletter!"
}
```

**Error Response (400):**
```json
{
  "error": "Email is required"
}
```

**Error Response (500):**
```json
{
  "error": "Database error message"
}
```

---

#### 2. Create Reservation

**POST** `/api/reservations`

Create a new table reservation.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "202-555-1234",
  "timeSlot": "2025-12-25 19:00:00",
  "guests": 4
}
```

**Success Response (200):**
```json
{
  "message": "Reservation confirmed! Your table number is 15.",
  "reservationId": 1,
  "tableNumber": 15,
  "timeSlot": "2025-12-25 19:00:00"
}
```

**Error Response (400):**
```json
{
  "error": "Name, email, and time slot are required"
}
```

**Error Response (409):**
```json
{
  "error": "No tables available for this time slot. Please select a different time."
}
```

---

#### 3. Get Reservation

**GET** `/api/reservations/:id`

Retrieve reservation details by ID.

**Success Response (200):**
```json
{
  "reservationId": 1,
  "timeSlot": "2025-12-25 19:00:00",
  "tableNumber": 15,
  "customerName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "202-555-1234"
}
```

**Error Response (404):**
```json
{
  "error": "Reservation not found"
}
```

---

#### 4. Health Check

**GET** `/health`

Check if the API is running.

**Success Response (200):**
```json
{
  "status": "healthy"
}
```

<a id="security-considerations"></a>
## 🔒 Security Considerations

### For Production Deployment

1. **Environment Variables**: Never commit passwords or API keys:
   ```bash
   # Create .env file
   DB_PASSWORD=your_password
   SECRET_KEY=your_secret_key
   ```

2. **CORS**: Restrict to specific origins:
   ```python
   CORS(app, resources={r"/api/*": {"origins": "https://yourdomain.com"}})
   ```

3. **Input Validation**: Already implemented in forms.

4. **SQL Injection**: Using parameterized queries (already implemented).

5. **HTTPS**: Use SSL certificates in production.

6. **Rate Limiting**: Need to add Flask-Limiter.

<a id="additional-notes"></a>
## 📝 Additional Notes

### Restaurant Business Hours

- **Monday - Saturday**: 5:00 PM - 11:00 PM
  - Last reservation: 10:00 PM
- **Sunday**: 5:00 PM - 9:00 PM
  - Last reservation: 8:00 PM

### Table Management

- **Total Tables**: 30
- **Reservation Time Slots**: Every 30 minutes w/ 1 hour buffer between closing times. 
- **Double-Booking Prevention**: Unique constraint on (table_number, time_slot).

### Browser Compatibility

Tested and working on:
- ✅ Google Chrome (142.0.7444.176 [Official Build] [64-bit])

### Mobile Responsiveness

- Responsive breakpoints: 768px, 968px.
- Mobile-first hamburger menu.
- Touch-friendly buttons and forms.
- Optimized images for mobile.

<a id="support"></a>
## 👥 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [API Documentation](#api-documentation)
3. Contact: vishantp@live.com.au

<a id="license"></a>
## 📄 License

This project is for educational purposes as part of the Quantic Master of Science of Software Engineering (MSSE) program.

<a id="acknowledgements"></a>
## 🙏 Acknowledgments

- Developed as part of Web Application and Interface Design course from Quantic (MSSE).
- AI assistance provided by **Claude (Anthropic) Sonnet 4.5 Model:** https://claude.ai/
- React documentation: https://react.dev/
- Flask documentation: https://flask.palletsprojects.com/
- PostgreSQL documentation: https://www.postgresql.org/docs/

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅