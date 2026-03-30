Project B – Dan Vokey’s Plumbing Services Web Application
Project Overview

This project is a full-stack web application developed for Dan Vokey’s Plumbing Services (Kingston, Ontario). It extends an existing static website into a dynamic, database-driven system that allows customers to submit plumbing service requests and quote inquiries online.

The application demonstrates core full-stack functionality including user authentication, server-side processing, and persistent data storage using a relational database.

Key Features
User Authentication
Secure user registration and login
Passwords hashed using bcrypt
Session-based authentication
Service Request Submission
Customers can submit plumbing service or quote requests
Requests include service type and detailed description
Database Integration
All user accounts and service requests are stored in MySQL
Data persists and can be retrieved and displayed dynamically
Request Management (User View)
Users can view all their submitted service requests
Requests are displayed in chronological order
Technology Stack
Layer	Technology
Frontend	HTML, CSS, EJS Templates
Backend	Node.js, Express.js
Database	MySQL (XAMPP)
Authentication	express-session, bcrypt
Environment	dotenv
Project Structure
netzero-project-b-babu
│
├── public/           # Static assets (CSS)
├── views/            # EJS templates (UI)
├── app.js            # Main server file
├── database.sql      # Database schema and tables
├── package.json      # Project dependencies
├── .env              # Environment variables (not included in repo)
└── README.md         # Project documentation
Installation & Setup
1. Clone the repository
git clone https://github.com/Naveen-babu-t/netzero-project-b-babu
cd netzero-project-b-babu
2. Install dependencies
npm install
3. Start MySQL (XAMPP)
Open XAMPP Control Panel
Start MySQL
4. Create and import database
Open: http://localhost/phpmyadmin
Create database:
netzero_project_b
Import the provided database.sql file
5. Create .env file

Create a file named .env in the root directory and add:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=netzero_project_b
SESSION_SECRET=your_secret_key

⚠️ Do NOT upload .env to GitHub

6. Run the application
node app.js

Open in browser:

http://localhost:3000
Database Schema
Users Table
id (Primary Key)
username
password (hashed)
Requests Table
id (Primary Key)
user_id (Foreign Key)
service_type
description
created_at
How to Use
Register a new account
Log in with your credentials
Submit a plumbing service or quote request
View submitted requests in the “My Requests” section
Data is stored and viewable in phpMyAdmin
Security Considerations
Passwords are securely hashed using bcrypt
Sensitive configuration is stored in .env
Sessions are used to manage authentication state
.env is excluded via .gitignore
Demonstration Scope

This project demonstrates:

Full CRUD flow (Create & Read implemented)
User authentication
Backend–database integration
Real-world service request workflow
Author

Naveen Babu
Computer Programming and Analysis
St. Lawrence College
