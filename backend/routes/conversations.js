const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    const stmt = db.prepare(`
    SELECT
      conversation_id,
      MAX(timestamp) as last_message_time,
      COUNT(*) as message_count,
      (SELECT message FROM messages m2
       WHERE m2.conversation_id = m1.conversation_id
       ORDER BY timestamp DESC LIMIT 1) as last_message,
      (SELECT sender FROM messages m2
       WHERE m2.conversation_id = m1.conversation_id
       ORDER BY timestamp DESC LIMIT 1) as last_sender
    FROM messages m1
    GROUP BY conversation_id
    ORDER BY last_message_time DESC
  `);
    res.json(stmt.all());
});

router.get('/:conversationId/messages', (req, res) => {
    const { conversationId } = req.params;
    const stmt = db.prepare(`
    SELECT * FROM messages
    WHERE conversation_id = ?
    ORDER BY timestamp ASC
  `);
    res.json(stmt.all(decodeURIComponent(conversationId)));
});

module.exports = router;