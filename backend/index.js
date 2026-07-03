const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/owner', require('./routes/owner'));
app.use('/conversations', require('./routes/conversations'));
app.use('/messages', require('./routes/messages'));
app.use('/search', require('./routes/messages'));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});