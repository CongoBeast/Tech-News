import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Home.css'; // Import the CSS file for custom styles
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";


function Home() {
  return (
    <Container fluid className="home-container">
      <h2 className="my-4 text-center">Tech News, but better.</h2>

      <Row className='d-flex justify-content-center align-items-center'>
        <Col>
          <Button as={Link} to="/search-articles" className="text-left align-items-center btn btn-success gradient-button my-4">
            Search Articles <IoSearchSharp />
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {[
          { name: 'Africa', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3uM6QBzNk_T8fGzs_DNnYNc7h-FmE5q8OQQ&s' },
          { name: 'Asia', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoFG-6qHN6N5437SJfcUueByY3qxFMnd7W3Q&s' },
          { name: 'MiddleEast', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReISHOGz3t6zwvzLDahh9Zw38Ag77J3A-hgQ&s' },
          { name: 'America', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtTVfaoMCY1ZtAl1Z75JssPjVSwOvDWnGDDQ&s' },
          { name: 'Europe', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVKuH3r5AC-SEvsj738xBmbyEcnQ-MsaifA&s' },
        ].map((continent, idx) => (
          <Col key={idx} md={4} lg={3} className="mb-4">
            <Link to={`/region/${continent.name.toLowerCase()}`} className="text-decoration-none">
              <Card className="continent-card">
                <Card.Img variant="top" src={continent.img} />
                <Card.Body>
                  <Card.Title>{continent.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
