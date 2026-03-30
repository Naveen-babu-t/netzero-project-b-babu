# Project B - Dan Vokey's Plumbing Services

## Project Description
This is a full-stack web application built for Dan Vokey’s Plumbing Services in Kingston, Ontario. The app allows customers to register, log in, and submit plumbing service requests or quote requests. The requests are stored in a MySQL database.

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