// backend/controllers/storyController.js
const Story = require('../models/Story');
const User = require('../models/User');

// Create a story
const createStory = async (req, res) => {
  try {
      const { title, author, content } = req.body;

      // Validate input fields
      if (!title || !content || !author) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Ensure author exists
      const user = await User.findOne({ name: author });
        if (!user) {
            return res.status(404).json({ message: "Author not found" });
        }

      const newStory = new Story({ title, content, author: user._id });
      await newStory.save();

      res.status(201).json({ message: "Story created successfully", story: newStory });
  } catch (error) {
      console.error("Error in createStory:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
  
  // Get all stories
  const getStories = async (req, res) => {
    try {
      const stories = await Story.find({}).populate("author", "name email");
        if (stories.length === 0) {
            return res.status(404).json({ message: "No stories found" });
        }
        res.status(200).json(stories);
    } catch (error) {
        console.error("Error in getStories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
  
  module.exports = { createStory, getStories }; // ✅ Ensure correct export
  