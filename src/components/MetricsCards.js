import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const gradientColors = [
  'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
  'linear-gradient(45deg, #ff758c 0%, #6a11cb 100%)',
  'linear-gradient(45deg, #2575fc 0%, #fecfef 99%, #fecfef 100%)',
  'linear-gradient(45deg, #2575fc 0%, #6a11cb 100%)',
];

function MetricsCards({ metrics }) {
  return (
    <Row>
      {metrics.map((metric, index) => (
        <Col md={3} key={index} className="mb-4">
          <Card style={{ background: gradientColors[index % gradientColors.length], color: 'white' }}>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }} >{metric.value}</Card.Title>
              <Card.Text>{metric.label}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default MetricsCards;
