import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; 
import Navbar from "./Component/Navbar";
import Home from "./pages/Home"; 
import StoryShare from "./pages/StoryShare";
import AskQuestion from "./Component/AskOuestion";  
import "./styles/App.css";
import StoryCard from "./Component/StoryCard";  



const App = () => {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, 
      easing: "ease-in-out",
      mirror: true, 
    });

    AOS.refresh();
  }, []);

  const handleAddStory = (newStory) => {
    setStories((prevStories) => [...prevStories, newStory]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<StoryCard stories={stories} />} />

        <Route path="/add-story" element={<StoryShare onAddStory={handleAddStory} />} />
      </Routes>
      <AskQuestion />
      <Home />
    </Router>
  );
};

export default App;