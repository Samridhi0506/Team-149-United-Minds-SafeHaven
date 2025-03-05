// backend/routes/storyRoutes.js
const express = require('express');
const router = express.Router();
const { createStory, getStories } = require('../controllers/storyController');

// Route definitions
router.post('/', createStory);
router.get('/', getStories);

module.exports = router; // ✅ Ensure router is exported
