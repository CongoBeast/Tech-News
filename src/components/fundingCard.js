import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Home.css'; // Import the CSS file for custom styles
import { Link } from 'react-router-dom';
import StartupCard from "./startupCard"

function Funding() {
  return (
    <Container fluid className="home-container">
      <h2 className="my-4 text-center">Who is getting funded?</h2>
      <StartupCard />
    </Container>
  );
}

export default Funding;
