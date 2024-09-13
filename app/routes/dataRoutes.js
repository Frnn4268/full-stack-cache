const express = require('express');
const router = express.Router();
const cache = require('../middlewares/cacheMiddleware');
const dataController = require('../controllers/dataController');

// Route that uses cache
router.get('/data', cache, dataController.getData);

module.exports = router;
