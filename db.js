const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',   // force IPv4
  user: 'root',
  password: '',        // leave empty if no XAMPP password
  database: 'expenses_db',
  port: 3307           // your actual XAMPP port
});

// handle errors correctly
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL Database on port 3307');
});

module.exports = db;
