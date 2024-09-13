const express = require('express');
const router = express.Router();
const pageViewsController = require('../controllers/pageViewsController');

// Route for real-time analytics (page views counter)
router.get('/page-views', pageViewsController.getPageViews);

module.exports = router;
