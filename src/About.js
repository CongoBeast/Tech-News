import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './AboutUs.css'; // You can create and customize a CSS file for additional styling

const AboutUs = () => {
  return (
    <Container className="about-us-container">
      <Row className="text-center my-5">
        <Col>
          <h1>About Cordelia</h1>
          <p className="lead">
            Welcome to <strong>Cordelia</strong>, the ultimate platform for tech enthusiasts and industry leaders.
          </p>
          <p>
            In a world overflowing with information, Cordelia stands out by providing you with curated, insightful
            content on the latest trends and breakthroughs in technology.
          </p>
          <p>
            At Cordelia, we bring you the freshest news on funding and the innovations set to disrupt industries
            globally. Whether you're interested in artificial intelligence, blockchain, cybersecurity, IoT, or energy
            technology, our mission is to keep you informed and ahead of the curve.
          </p>
          <p>
            We're just getting started, and we invite you to join us on this exciting journey. With Cordelia, you'll
            have the best tools at your disposal for tech research, discovery, and investment. Together, let's explore
            the future of technology and unlock its potential.
          </p>
        </Col>
      </Row>
      <Row className="text-center my-5">
        <Col>
          <h2>Connect with Us</h2>
          <Button variant="link" href="https://facebook.com" className="mx-2">
            <FaFacebook size={32} />
          </Button>
          <Button variant="link" href="https://twitter.com" className="mx-2">
            <FaTwitter size={32} />
          </Button>
          <Button variant="link" href="https://linkedin.com" className="mx-2">
            <FaLinkedin size={32} />
          </Button>
          <Button variant="link" href="https://instagram.com" className="mx-2">
            <FaInstagram size={32} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
