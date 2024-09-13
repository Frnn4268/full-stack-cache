const client = require('../config/redisClient');

const getPageViews = async (req, res) => {
  try {
    // Increment counter in Redis
    const views = await client.incr('pageViews');
    res.json({ pageViews: views });
  } catch (err) {
    console.error('Error en Redis:', err);
    res.status(500).send('Error incrementing counter');
  }
};

module.exports = {
  getPageViews
};
