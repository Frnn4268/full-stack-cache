const express = require('express');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const dotenv = require('dotenv');

dotenv.config();

// Create Redis client
const client = require('./config/redisClient');

const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:80', 
  methods: 'GET,POST',
  credentials: true
}));

// Configure sessions with Redis as storage
app.use(session({
  store: new RedisStore({ client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // In production, use secure: true if you're using HTTPS
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const dataRoutes = require('./routes/dataRoutes');
const pageViewsRoutes = require('./routes/pageViewsRoutes');

// Use routes
app.use('/api', dataRoutes);
app.use('/api', pageViewsRoutes);

// Route to handle sessions
app.get('/session', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`You have visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.send('Welcome to the page for the first time!');
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello! The server is running.');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000');
});
