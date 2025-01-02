import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";

const ArticleEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSaveAsDraft = () => {
    setAlertMessage("Article saved as draft!");
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleSubmit = () => {
    // Submit logic goes here (e.g., send to backend)
    setAlertMessage("Article submitted successfully!");
    setTimeout(() => setAlertMessage(null), 3000);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Write a New Article</Card.Title>

              {alertMessage && <Alert variant="success">{alertMessage}</Alert>}

              <Form>
                {/* Title Input */}
                <Form.Group controlId="articleTitle" className="mb-3">
                  <Form.Label>Article Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your article title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                {/* Content Input */}
                <Form.Group controlId="articleContent" className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Write your article content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>

                {/* Image Upload */}
                <Form.Group controlId="articleImage" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                  {image && <p className="mt-2">Selected Image: {image.name}</p>}
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleSaveAsDraft}>
                    Save as Draft
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleEditor;
