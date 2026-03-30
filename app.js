const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');

dotenv.config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user || null });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('register', { error: 'Please fill in all fields.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.render('register', { error: 'Username already exists.' });
        }
        return res.render('register', { error: 'Registration failed.' });
      }

      res.redirect('/login');
    });
  } catch (error) {
    res.render('register', { error: 'Something went wrong.' });
  }
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.render('login', { error: 'Invalid username or password.' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.render('login', { error: 'Invalid username or password.' });
    }

    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.redirect('/dashboard');
  });
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

app.post('/requests', isAuthenticated, (req, res) => {
  const { service_type, description } = req.body;
  const userId = req.session.user.id;

  if (!service_type || !description) {
    return res.redirect('/dashboard');
  }

  const sql = 'INSERT INTO requests (user_id, service_type, description) VALUES (?, ?, ?)';
  db.query(sql, [userId, service_type, description], (err) => {
    if (err) {
      console.error(err);
      return res.send('Error saving request.');
    }

    res.redirect('/my-requests');
  });
});

app.get('/my-requests', isAuthenticated, (req, res) => {
  const userId = req.session.user.id;

  const sql = 'SELECT * FROM requests WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.send('Error loading requests.');
    }

    res.render('requests', {
      user: req.session.user,
      requests: results
    });
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});