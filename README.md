# Project B - PC Plus Service Request App

## Project Description
This is a full-stack web application built for a local business called PC Plus. The app allows users to register, log in, and submit service requests. The requests are stored in a MySQL database.

## Tech Stack
- Node.js
- Express
- MySQL
- EJS
- CSS
- bcrypt
- express-session
- dotenv

## Installation Instructions
1. Clone the repository
2. Run `npm install`
3. Start MySQL in XAMPP
4. Create a database named `netzero_project_b`
5. Import `database.sql` into phpMyAdmin
6. Create a `.env` file with the required variables
7. Run `node app.js`
8. Open `http://localhost:3000`

## Environment Variables
Create a `.env` file with:

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=  
DB_NAME=netzero_project_b  
SESSION_SECRET=pcplussecret123