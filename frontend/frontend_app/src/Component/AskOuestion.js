import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const AskQuestion = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(""); // ✅ Email state added
  const [question, setQuestion] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setEmail("");  // ✅ Reset email on close
    setQuestion(""); // ✅ Reset question on close
    setShow(false);
  };

  const submitQuestion = async () => {
    if (!email.trim()) {
      alert("❌ Please enter your email id!");
      return;
    }
    if (!question.trim()) {
      alert("❌ Please enter a question!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/ask", { email, question }); // ✅ Fixed API call
      alert("✅ Question added!");
      handleClose();
    } catch (err) {
      alert("❌ Failed to add question");
      console.log(err);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button variant="warning" className="ask-question-btn" onClick={handleShow}>
        🗨 Ask a Question
      </Button>

      {/* Modal for Question Input */}
      <Modal show={show} onHide={handleClose} centered>
        <div id="modal">
          <Modal.Header closeButton>
            <Modal.Title>Ask a Question</Modal.Title>
          </Modal.Header>
          <Modal.Body id="ask">
            <label>Your Email ID:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email id"
              value={email} // ✅ Controlled input
              onChange={(e) => setEmail(e.target.value)} // ✅ Update state
            />
            <br />
            <label>Your Query:</label>
            <textarea
              className="form-control"
              placeholder="Type your question here..."
              rows="4"
              value={question} // ✅ Controlled input
              onChange={(e) => setQuestion(e.target.value)} // ✅ Update state
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitQuestion}>
              Submit
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Floating Button Styles */}
      <style>
        {`
          .ask-question-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            border-radius: 50px;
            padding: 10px 20px;
          }
          #modal {
            background-color: rgb(92, 136, 179);
            border-radius: 10px;
            color: white;
          }
        `}
      </style>
    </>
  );
};

export default AskQuestion;