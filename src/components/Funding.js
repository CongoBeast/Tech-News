import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Home.css'; // Import the CSS file for custom styles
import axios from 'axios';
import FundingTable from './fundingTable';

function Funding() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/funding-news')
      .then(response => {
        setFundingData(response.data);
      })
      .catch(error => {
        console.error('Error fetching funding data:', error);
      });
  }, []);

  return (
    <Container fluid className="home-container">
      <h2 className="my-4 text-center">Who is getting funded?</h2>
      <FundingTable rows={fundingData} />
    </Container>
  );
}

export default Funding;
