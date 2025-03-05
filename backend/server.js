// backend/server.js
require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT =5000;

// Importing the story routes
const storyRoutes = require('./routes/storyRoutes');
const userRoutes = require('./routes/userRoutes');
const emergencyContactRoutes = require('./routes/emergencyContactRoutes');


app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/SafeHaven')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  

// Debug output
console.log("userRoutes:", userRoutes);
console.log('storyRoutes:', storyRoutes);
console.log('emergencyContactRoutes:', emergencyContactRoutes);
// Use the story routes
app.use('/api/stories', storyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/emergency-contacts', emergencyContactRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to SafeHaven API');
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
