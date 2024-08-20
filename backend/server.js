require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');

const app = express();

// Create an HTTP server instance using the Express app
const server = http.createServer(app);

// Attach Socket.IO to the same server instance
const io = socketIo(server, {
  cors: {
    origin: process.env.REACT_APP_API_URL, // Ensure this is set correctly in your .env
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main()
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => console.log(err));

const corsOptions = {
  credentials: true,
  origin: process.env.REACT_APP_API_URL,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json({ limit: '8mb' }));

// Routes
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Socket.IO Logic
let users = {}; // Store users based on persistent identifiers

io.on('connection', (socket) => {
  const persistentId = socket.handshake.query.persistentId;
  if (!persistentId) {
    console.error('Error: persistentId is undefined!');
  }
  // Handle user registration or reconnection
  if (!users[persistentId]) {
    users[persistentId] = { score: 0, lastSubmit: null };
    console.log('New user added:', persistentId);
  } else {
    console.log('Existing user reconnected:', persistentId);
  }

  // Emit user_id to the client
  socket.emit('user_id', { userId: persistentId });

  // Handle leaderboard request
  socket.on('request_leaderboard', () => {
    socket.emit('update_leaderboard', { users: getSortedUsers() });
  });

  // Handle score submission
  socket.on('submit_score', ({points}) => {
    const currentTime = new Date();
    users[persistentId].score += points;
    users[persistentId].lastSubmit = currentTime;
    console.log('User data after score submission:', users[persistentId]);

    // Update leaderboard for all clients
    io.emit('update_leaderboard', { users: getSortedUsers() });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${persistentId}`);
    // No need to delete user data, as it's linked to the persistent ID
  });
});

function getSortedUsers() {
  return Object.entries(users)
    .map(([id, data]) => ({ userId: id, ...data }))
    .filter(user => user.userId !== 'undefined') // Exclude entries where userId is 'undefined'
    .sort((a, b) => {
      if (b.score === a.score) {
        return new Date(a.lastSubmit) - new Date(b.lastSubmit);
      }
      return b.score - a.score;
    });
}

// Start the server (both Express and Socket.IO will use this)
const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
