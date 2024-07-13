import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

function FundingAnalysis() {
  const [fundingData, setFundingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});
  const [regionBarData, setRegionBarData] = useState({});
  const [topFunding, setTopFunding] = useState({});
  const [loading, setLoading] = useState(true);

  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState('July');
  const [region, setRegion] = useState('america');
  const [tag, setTag] = useState('AI');
  const [type, setType] = useState('Series A');



  useEffect(() => {
    fetchFundingData();
  }, []);

  useEffect(() => {
    filterData();
  }, [year, month, region, tag, type, fundingData]);

  const fetchFundingData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/funding-news');
      const data = response.data;
      setFundingData(data);
      processFundingData(data);
      setLoading(false); // Data fetching is complete
    } catch (error) {
      console.error('Error fetching funding data:', error);
      setLoading(false); // Even on error, stop loading
    }
  };

  const filterData = () => {
    let filtered = fundingData;
    if (year) filtered = filtered.filter(item => item.year === year);
    if (month) filtered = filtered.filter(item => item.month === month);
    if (region) filtered = filtered.filter(item => item.region === region);
    if (tag) filtered = filtered.filter(item => item.tag === tag);
    if (type) filtered = filtered.filter(item => item.type === type);
    setFilteredData(filtered);
    processFundingData(filtered);
  };

  const processFundingData = (data) => {
    const tags = ['AI', 'Blockchain', 'IoT', 'Aerospace', 'Climate', 'Energy', 'Security', 'Military', 'MotorVehicles', 'BioTech', 'Agric'];
    const continents = ['america', 'europe', 'asia', 'africa', 'middleEast'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const types = ['Series A', 'Series B', 'Pre-Seed', 'Seed', 'Pre-Series A'];

    const tagsData = tags.map(tag => data.filter(article => article.tag === tag));
    const continentData = continents.map(continent => data.filter(article => article.region === continent).length);

    const tagSummaries = tags.map(tag => {
      const articlesWithTag = data.filter(article => article.tag === tag);
      const totalSize = articlesWithTag.reduce((sum, article) => {
        const size = parseInt(article.size, 10) || 0;
        return sum + size;
      }, 0);
      return totalSize;
    });

    const regionSummaries = continents.map(region => {
      const articlesWithTag = data.filter(article => article.region === region);
      const totalSize = articlesWithTag.reduce((sum, article) => {
        const size = parseInt(article.size, 10) || 0;
        return sum + size;
      }, 0);
      return totalSize;
    });

    const monthSummaries = months.map(month => {
      const articlesWithTag = data.filter(article => article.month === month);
      const totalSize = articlesWithTag.reduce((sum, article) => {
        const size = parseInt(article.size, 10) || 0;
        return sum + size;
      }, 0);
      return totalSize;
    });

    const typeSummaries = types.map(type => {
      const articlesWithTag = data.filter(article => article.type === type);
      const totalSize = articlesWithTag.reduce((sum, article) => {
        const size = parseInt(article.size, 10) || 0;
        return sum + size;
      }, 0);
      return totalSize;
    });

    // Processing logic for charts and top funding cards
    const tagBarChartData = {
      labels: tags,
      datasets: [
        {
          label: 'Funding by Tag',
          data: tagSummaries,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    const barChartData = {
      labels: months,
      datasets: [
        {
          label: 'Funding Raised Each Month (USD)',
          data: monthSummaries,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    const pieChartData = {
      labels: types,
      datasets: [
        {
          label: 'Funding Type Distribution',
          data: typeSummaries,
          backgroundColor: [
            'rgba(255,99,132,0.6)',
            'rgba(54,162,235,0.6)',
            'rgba(255,206,86,0.6)',
            'rgba(75,192,192,0.6)',
            'rgba(153,102,255,0.6)',
          ],
          borderWidth: 1,
          cutout: '50%', // Turn pie chart into a donut chart
        },
      ],
    };

    const regionBarChartData = {
      labels: continents,
      datasets: [
        {
          label: 'Funding by Region (USD)',
          data: regionSummaries,
          backgroundColor: 'rgba(153,102,255,0.4)',
          borderColor: 'rgba(153,102,255,1)',
          borderWidth: 1,
        },
      ],
    };

    const topFundingMetrics = {
      highestFunding: Math.max(...tagSummaries), // Replace with highest funding amount
      topContinent: continents[regionSummaries.indexOf(Math.max(...regionSummaries))], // Replace with continent with the most funding
      topTag: tags[tagSummaries.indexOf(Math.max(...tagSummaries))], // Replace with tag with the most funding
    };

    // Set chart data
    setLineData(barChartData); // Change line chart to bar chart data
    setBarData(tagBarChartData); // Bar chart for funding by tag
    setPieData(pieChartData); // Donut chart
    setRegionBarData(regionBarChartData); // Bar chart for funding by region
    setTopFunding(topFundingMetrics);
  };

  return (
    <Container fluid>
      <h2 className="my-4">Funding Analysis</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Card className="mb-4" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)', color: 'white' }}>
                <Card.Body>
                  <Card.Title>${topFunding.highestFunding}</Card.Title>
                  <Card.Text>Highest Funding This Month</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4" style={{ background: 'linear-gradient(to right, #4facfe, #00f2fe)', color: 'white' }}>
                <Card.Body>
                <Card.Title>{topFunding.topContinent}</Card.Title>
                <Card.Text>Most funded region</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="mb-4" style={{ background: 'linear-gradient(to right, #43e97b, #38f9d7)', color: 'white' }}>
                <Card.Body>
                <Card.Title>{topFunding.topTag}</Card.Title>
                  <Card.Text>Round with the most</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="mb-4" style={{ background: 'linear-gradient(to right, #43e97b, #38f9d7)', color: 'white' }}>
                <Card.Body>
                <Card.Title>{topFunding.topTag}</Card.Title>
                  <Card.Text>Most funded tag</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-4">
              <Bar data={barData} options={{ maintainAspectRatio: false, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } }} height={300} />
            </Col>
            <Col md={6} className="mb-4">
              <Bar data={lineData} options={{ maintainAspectRatio: false, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } }} height={300} />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-4">
              <Bar data={regionBarData} options={{ maintainAspectRatio: false, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } }} height={300} />
            </Col>
            <Col md={6} className="mb-4">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} height={300} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default FundingAnalysis;
