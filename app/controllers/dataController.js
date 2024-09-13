const fetch = require('node-fetch');
const client = require('../config/redisClient');

const getData = async (req, res) => {
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
};

module.exports = {
  getData
};
