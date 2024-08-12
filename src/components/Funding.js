import React, { useState, useEffect } from 'react';
import { Container , Button  } from 'react-bootstrap';
import './Home.css'; // Import the CSS file for custom styles
import axios from 'axios';
import FundingTable from './fundingTable';
import { Link, useLocation } from "react-router-dom";


function Funding() {
  const [fundingData, setFundingData] = useState([]);

    // console.log(JSON.parse(localStorage.getItem('fundingData')))
    // if(JSON.parse(localStorage.getItem('fundingData'))){
    //   setFundingData(JSON.parse(localStorage.getItem('fundingData')))
    // }

  // useEffect(() => {
  //   axios.get('https://tech-news-backend.onrender.com/funding-news')
  //     .then(response => {
  //       setFundingData(response.data);
  //       localStorage.setItem('fundingData', JSON.stringify(response.data));
  //     })
  //     .catch(error => {
  //       console.error('Error fetching funding data:', error);
  //     });
  // }, []);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('fundingData'));

    if (storedData && storedData.length > 0) {
      // Use data from local storage
      setFundingData(storedData);
    } else {
      // Fetch data from the API if not available in local storage
      axios.get('https://tech-news-backend.onrender.com/funding-news')
        .then(response => {
          setFundingData(response.data);
          localStorage.setItem('fundingData', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error('Error fetching funding data:', error);
        });
    }
  }, []);

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

      <FundingTable rows={fundingData} />
    </Container>
  );
}

export default Funding;
