const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'netzero_project_b'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected Successfully to MySQL database!');
  }
});

app.get('/', (req, res) => {
  if (connection.state === 'authenticated') {
    res.send('Connected Successfully to MySQL database!');
  } else {
    res.send('Database connection failed.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});