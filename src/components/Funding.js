import React, { useState, useEffect } from 'react';
import { Container , Button  } from 'react-bootstrap';
import './Home.css'; // Import the CSS file for custom styles
import axios from 'axios';
import FundingTable from './fundingTable';
import { Link, useLocation } from "react-router-dom";


function Funding() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    axios.get('https://tech-news-backend.onrender.com/funding-news')
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
      <div className="d-flex justify-content-center my-4">
        <Button
          as={Link}
          to="/fundinganalysis"
          className="text-left align-items-center btn btn-success gradient-button"
        >
          Analyze Funding Trends
        </Button>
      </div>

      <FundingTable rows={fundingData} />
    </Container>
  );
}

export default Funding;
