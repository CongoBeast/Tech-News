import React, { useState, useEffect } from 'react';
import { Container , Button, Form  } from 'react-bootstrap';
import './Home.css'; // Import the CSS file for custom styles
import axios from 'axios';
import FundingTable from './fundingTable';
import { Link, useLocation } from "react-router-dom";


function Funding() {
  const [fundingData, setFundingData] = useState([]);
  const [filter, setFilter] = useState('thisMonth');

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem('fundingData'));

  //   if (storedData && storedData.length > 0) {
  //     // Use data from local storage
  //     setFundingData(storedData);
  //   } else {
  //     // Fetch data from the API if not available in local storage
  //     axios.get('https://tech-news-backend.onrender.com/funding-news')
  //       .then(response => {
  //         setFundingData(response.data);
  //         localStorage.setItem('fundingData', JSON.stringify(response.data));
  //       })
  //       .catch(error => {
  //         console.error('Error fetching funding data:', error);
  //       });
  //   }
  // }, []);
  const fetchArticles = (selectedFilter) => {
    axios.get('https://tech-news-backend.onrender.com/funding-news', {
        params: {
          filter: selectedFilter // Send the selected filter to the backend
        }
      })
        .then(response => {
          setFundingData(response.data.reverse());
          localStorage.setItem('fundingData', JSON.stringify(response.data));
        })
        .catch(error => {
            console.error('There was an error fetching the articles!', error);
        });
};

useEffect(() => {
  fetchArticles(filter); // Pass the current filter
}, [filter])


  const handleDateFilter = (event) => {
    setFilter(event.target.value); // Update the filter state
  };

  return (
    <Container fluid className="home-container">
      <h2 className="my-4 text-center">Who is getting funded?</h2>
      <div className="d-flex justify-content-center my-4">
        <Button
          as={Link}
          to="/fundinganalysis"
          className="text-left align-items-center btn btn-success gradient-button mx-1"
        >
          Analyze Funding Trends
        </Button>

        {/* <Button
          as={Link}
          to="/ninefigure"
          className="text-left align-items-center btn btn-success gradient-button mx-1"
        >
          9 figure club
        </Button> */}

      </div>

      <div className="mb-3">
                <Form.Check
                inline
                label="This Month"
                name="group1"
                type='radio'
                id={`thisMonth`}
                value="thisMonth" // Set value for this month
                checked={filter === 'thisMonth'} // Check if this is the selected filter
                onChange={handleDateFilter} // Handle change
                />
                <Form.Check
                inline
                label="Last Month"
                name="group1"
                type='radio'
                id={`lastMonth`}
                value="lastMonth" // Set value for last month
                checked={filter === 'lastMonth'} // Check if this is the selected filter
                onChange={handleDateFilter} // Handle change
                />
                <Form.Check
                inline
                label="All time"
                name="group1"
                type='radio'
                id={`All`}
                value="all" // Set value for all time
                checked={filter === 'all'} // Check if this is the selected filter
                onChange={handleDateFilter} // Handle change
                />
        </div>

      <FundingTable rows={fundingData} />
    </Container>
  );
}

export default Funding;
