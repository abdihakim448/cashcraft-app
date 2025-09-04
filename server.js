const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Route modules
const expenseRoutes = require('./routes/expenses');
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL connection (XAMPP port 3307)
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'expenses_db',
  port: 3307
});

db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL Database on port 3307');
});

// ✅ Inject db into request object
app.use((req, res, next) => {
  req.db = db;
  next();
});

// ✅ API Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('✅ Backend is running! Available routes: /api/expenses, /api/projects, /api/auth');
});

// ✅ Error handler (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
