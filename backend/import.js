const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database('chats.db');

function fixEncoding(str) {
    try {
        return decodeURIComponent(escape(str));
    } catch {
        return str;
    }
}

function convertTimestamp(ms) {
    return new Date(ms).toISOString();
}

function importConversation(folderPath) {
    let allMessages = [];
    let title = '';
    let conversationId = '';

    // Find all message_1.json, message_2.json, etc.
    let fileIndex = 1;
    while (true) {
        const filePath = path.join(folderPath, `message_${fileIndex}.json`);
        if (!fs.existsSync(filePath)) break;

        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);

        // Grab metadata from first file
        if (fileIndex === 1) {
            title = fixEncoding(data.title);
            conversationId = data.thread_path;
        }

        allMessages = allMessages.concat(data.messages);
        fileIndex++;
    }

    if (allMessages.length === 0) return;

    console.log(`Importing: ${title} — ${allMessages.length} messages across ${fileIndex - 1} file(s)`);

    const stmt = db.prepare(`
    INSERT OR IGNORE INTO messages (conversation_id, sender, message, timestamp)
    VALUES (?, ?, ?, ?)
  `);

    const insertMany = db.transaction((messages) => {
        for (const msg of messages) {
            const sender = fixEncoding(msg.sender_name);
            const timestamp = convertTimestamp(msg.timestamp_ms);

            let content = '';
            if (msg.content) {
                content = fixEncoding(msg.content);
            } else if (msg.share?.share_text) {
                content = `[Shared post]: ${fixEncoding(msg.share.share_text)}`;
            } else if (msg.photos) {
                content = '[Photo]';
            } else {
                content = '[Attachment]';
            }

            stmt.run(conversationId, sender, content, timestamp);
        }
    });

    insertMany(allMessages);
    console.log(`✓ Done: ${title}`);
}

const inboxPath = process.argv[2];

if (!inboxPath) {
    console.log('Usage: node import.js /path/to/your/instagram-data/your_instagram_activity/messages/inbox');
    process.exit(1);
}

const conversations = fs.readdirSync(inboxPath);

for (const folder of conversations) {
    const folderPath = path.join(inboxPath, folder);
    if (fs.statSync(folderPath).isDirectory()) {
        importConversation(folderPath);
    }
}

console.log('\n✅ All conversations imported!');