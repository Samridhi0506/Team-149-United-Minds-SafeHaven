import axios from "axios";

const API_URL = "http://localhost:5000/api/stories"; // Backend API URL

// Fetch all stories
export const fetchStories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};

// Add a new story
export const addStory = async (storyData) => {
  try {
    const response = await axios.post(API_URL, storyData);
    return response.data;
  } catch (error) {
    console.error("Error adding story:", error);
    throw error;
  }
};

// Delete a story
export const deleteStory = async (storyId) => {
  try {
    await axios.delete(${API_URL}/${storyId});
  } catch (error) {
    console.error("Error deleting story:", error);
    throw error;
  }
};

// Update/Edit a story
export const updateStory = async (storyId, updatedData) => {
  try {
    const response = await axios.put(${API_URL}/${storyId}, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating story:", error);
    throw error;
  }
};