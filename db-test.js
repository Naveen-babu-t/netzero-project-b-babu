const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'netzero_project_b'
});

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    return;
  }

  console.log('Connected Successfully to MySQL database!');
  connection.end();
});