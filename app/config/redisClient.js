const redis = require('redis');
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

module.exports = client;
