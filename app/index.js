const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default;
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

// Create Redis client
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});

// Manage Redis errors
client.on('error', (err) => {
  console.error('Error con Redis:', err);
});

client.connect();

const app = express();

// Configure sessions with Redis as storage
app.use(session({
  store: new RedisStore({ client }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // In production, use secure: true if you're using HTTPS
}));

// Middleware to cache requests
const cache = async (req, res, next) => {
  const key = req.originalUrl || req.url;

  try {
    const data = await client.get(key);
    if (data) {
      console.log('Data obtained from the Redis cache');
      res.json(JSON.parse(data));
    } else {
      next();
    }
  } catch (err) {
    console.error('Error en Redis:', err);
    next();
  }
};

// Route that uses cache
app.get('/api/data', cache, async (req, res) => {
  try {
    // Simulate an external API
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();

    // Save in cache for 3600 seconds (1 hour)
    await client.setEx(req.originalUrl, 3600, JSON.stringify(data));

    res.json(data);
  } catch (error) {
    console.error('Error to get data:', error);
    res.status(500).send('Error del servidor');
  }
});

// Route to handle sessions
app.get('/session', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`<p>You have visited this page ${req.session.views} times</p>`);
  } else {
    req.session.views = 1;
    res.send('Welcome to the page for the first time!');
  }
});

// Route for real-time analytics (page views counter)
app.get('/page-views', async (req, res) => {
  try {
    // Increment counter in Redis
    const views = await client.incr('pageViews');
    res.json({ pageViews: views });
  } catch (err) {
    console.error('Error en Redis:', err);
    res.status(500).send('Error incrementing counter');
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
