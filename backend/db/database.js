const Database = require('better-sqlite3');

const db = new Database('chats.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id TEXT,
    sender TEXT,
    message TEXT,
    timestamp TEXT
  )
`);

module.exports = db;