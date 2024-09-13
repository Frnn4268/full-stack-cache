const client = require('../config/redisClient');

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

module.exports = cache;
