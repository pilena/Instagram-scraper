const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    const stmt = db.prepare(`
    SELECT sender, COUNT(DISTINCT conversation_id) as convo_count
    FROM messages
    GROUP BY sender
    ORDER BY convo_count DESC
    LIMIT 1
  `);
    const owner = stmt.get();
    res.json({ owner: owner.sender });
});

module.exports = router;