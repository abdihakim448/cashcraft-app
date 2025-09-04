const express = require('express');
const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
  req.db.query('SELECT * FROM projects', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    res.json(results);
  });
});

// GET project by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  req.db.query('SELECT * FROM projects WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    if (!results.length) return res.status(404).json({ message: 'Project not found' });
    res.json(results[0]);
  });
});

// POST add project
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Project name is required' });
  }

  req.db.query('INSERT INTO projects (name) VALUES (?)', [name.trim()], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed', details: err });
    res.json({ success: true, message: 'Project added', id: result.insertId });
  });
});

// PUT update project
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Project name is required' });
  }

  req.db.query('UPDATE projects SET name = ? WHERE id = ?', [name.trim(), id], err => {
    if (err) return res.status(500).json({ error: 'Update failed', details: err });
    res.json({ success: true, message: 'Project updated' });
  });
});

// DELETE project
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  req.db.query('DELETE FROM projects WHERE id = ?', [id], err => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err });
    res.json({ success: true, message: 'Project deleted' });
  });
});

module.exports = router;
