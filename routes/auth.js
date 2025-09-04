const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// POST signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

  // Check if username already exists
  req.db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    if (results.length) return res.status(409).json({ message: 'Username already taken' });

    const hashed = await bcrypt.hash(password, 10);
    req.db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], (err, result) => {
      if (err) return res.status(500).json({ error: 'Signup failed', details: err });
      res.json({ success: true, message: 'Signup successful' });
    });
  });
});

// POST login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  req.db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    if (!results.length) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ success: true, message: 'Login successful' });
  });
});

module.exports = router;
