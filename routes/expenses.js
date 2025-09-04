const express = require('express');
const router = express.Router();

// GET all or filtered expenses
router.get('/', (req, res) => {
  const { project, category, startDate, endDate } = req.query;
  let sql = 'SELECT * FROM expenses WHERE 1=1';
  const params = [];

  if (project) {
    sql += ' AND project = ?';
    params.push(project);
  }
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (startDate) {
    sql += ' AND date >= ?';
    params.push(startDate);
  }
  if (endDate) {
    sql += ' AND date <= ?';
    params.push(endDate);
  }

  req.db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    res.json(results);
  });
});

// GET expense by ID
router.get('/:id', (req, res) => {
  req.db.query('SELECT * FROM expenses WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    if (!results.length) return res.status(404).json({ message: 'Expense not found' });
    res.json(results[0]);
  });
});

// POST new expense
router.post('/', (req, res) => {
  const { project, category, description, amount, date } = req.body;
  if (!project || !category || !amount || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = 'INSERT INTO expenses (project, category, description, amount, date) VALUES (?, ?, ?, ?, ?)';
  const params = [project, category, description || '', parseFloat(amount), date];

  req.db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed', details: err });
    res.json({ success: true, message: 'Expense added', id: result.insertId });
  });
});

// PUT update expense
router.put('/:id', (req, res) => {
  const { project, category, description, amount, date } = req.body;
  if (!project || !category || !amount || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = 'UPDATE expenses SET project = ?, category = ?, description = ?, amount = ?, date = ? WHERE id = ?';
  const params = [project, category, description || '', parseFloat(amount), date, req.params.id];

  req.db.query(sql, params, err => {
    if (err) return res.status(500).json({ error: 'Update failed', details: err });
    res.json({ success: true, message: 'Expense updated' });
  });
});

// DELETE expense
router.delete('/:id', (req, res) => {
  req.db.query('DELETE FROM expenses WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err });
    res.json({ success: true, message: 'Expense deleted' });
  });
});

module.exports = router;
