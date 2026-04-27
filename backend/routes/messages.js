const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/', (req, res) => {
    const { conversation_id, sender, message, timestamp } = req.body;
    const stmt = db.prepare(`
    INSERT INTO messages (conversation_id, sender, message, timestamp)
    VALUES (?, ?, ?, ?)
  `);
    const result = stmt.run(conversation_id, sender, message, timestamp);
    res.json({ success: true, id: result.lastInsertRowid });
});

router.get('/search', (req, res) => {
    const { query } = req.query;
    const stmt = db.prepare(`
    SELECT * FROM messages
    WHERE message LIKE ?
    ORDER BY timestamp ASC
  `);
    res.json(stmt.all(`%${query}%`));
});

// search from specific conversation
router.get('/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  const { query } = req.query;

  const stmt = db.prepare(`
    SELECT * FROM messages
    WHERE conversation_id = ?
    AND message LIKE ?
    ORDER BY timestamp ASC
  `);

  res.json(stmt.all(decodeURIComponent(conversationId), `%${query}%`));
});

module.exports = router;
