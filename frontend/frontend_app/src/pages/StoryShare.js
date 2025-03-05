import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const StoryShare = ({ onAddStory }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !title || !content) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/stories", {
        title,
        content,
      });

      if (response.status === 201) {
        alert("Story added successfully!");
        onAddStory(response.data); // Update UI with the new story
        handleClose();
        setName("");
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error adding story:", error);
      alert("Failed to add story. Please try again.");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Add Story
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Story Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter story title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Story Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your story here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit Story
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StoryShare;