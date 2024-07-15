import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, DropdownButton, Button, Modal, Form, Card } from 'react-bootstrap';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, Filler } from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MapBox from './MapBox';
import axios from 'axios';
import './Trends.css'; // Import the CSS file for custom styles

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, Filler);

function Trends() {
  const [region, setRegion] = useState('America');
  const [genre, setGenre] = useState('Select Genre');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState('Select Month');
  const [week, setWeek] = useState('Select Week');
  const [year, setYear] = useState('Select Year');

  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [lineData, setLineData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [numPosts, setNumPosts] = useState(0);
  const [mostPopularRegion, setMostPopularRegion] = useState('');
  const [mostPopularTag, setMostPopularTag] = useState('');

  const [continentData2 , setContinentData] = useState('');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    fetchChartData();
  }, [region, genre, month, week, year]);

  const fetchChartData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get-articles');
      const articles = response.data;
  
      // Process the data
      const genres = ['AI', 'Blockchain', 'IoT', 'Aerospace', 'Climate', 'Energy', 'Security', 'Military', 'MotorVehicles', 'BioTech', 'Agric'];
      const continents = ['america', 'europe', 'asia', 'africa', 'middleeast'];
  
      const filteredArticles = articles.filter(article => {
        const articleDate = new Date(article.date);
        const selectedYear = year !== 'Select Year' ? articleDate.getFullYear() === parseInt(year) : true;
        const selectedMonth = month !== 'Select Month' ? articleDate.getMonth() === months.indexOf(month) : true;
        const selectedRegion = region !== 'Select Region' ? article.region === region.toLowerCase() : true;
        const selectedGenre = genre !== 'Select Genre' ? article.tag === genre : true;
        return selectedYear && selectedMonth && selectedRegion && selectedGenre;
      });

      const numPosts = filteredArticles.length;
      setNumPosts(numPosts);

      const genreData = genres.map(genre => filteredArticles.filter(article => article.tag === genre && article.status === 'Posted').length);
      const continentData = continents.map(continent => filteredArticles.filter(article => article.region === continent && article.status === 'Posted').length);
      setContinentData(continentData);
      const monthlyData = new Array(12).fill(0).map((_, index) => filteredArticles.filter(article => new Date(article.date).getMonth() === index && article.status === 'Posted').length);

      const mostPopularRegionIndex = continentData.indexOf(Math.max(...continentData));
      const mostPopularTagIndex = genreData.indexOf(Math.max(...genreData));

      setMostPopularRegion(continents[mostPopularRegionIndex]);
      setMostPopularTag(genres[mostPopularTagIndex]);
      
      setBarData({
        labels: genres,
        datasets: [
          {
            label: 'Posts by Genre',
            data: genreData,
            backgroundColor: genres.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
          },
        ],
      });
  
      setPieData({
        labels: continents,
        datasets: [
          {
            label: 'Posts by Region',
            data: continentData,
            backgroundColor: continents.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
          },
        ],
      });
  
      setLineData({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: genres.map((genre, index) => ({
          label: genre,
          data: new Array(12).fill(0).map((_, month) => filteredArticles.filter(article => article.tag === genre && new Date(article.date).getMonth() === month && article.status === 'Posted').length),
          fill: false,
          backgroundColor: `rgba(${index * 20}, 75, 192, 0.4)`,
          borderColor: `rgba(${index * 20}, 75, 192, 1)`,
        })),
      });
  
      setLoading(false); // Data fetching is complete
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setLoading(false); // Even on error, stop loading
    }
  };

  const handleRegionSelect = (region) => setRegion(region);
  const handleGenreSelect = (genre) => setGenre(genre);
  const handleMonthSelect = (month) => setMonth(month);
  const handleWeekSelect = (week) => setWeek(week);
  const handleYearSelect = (year) => setYear(year);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);


  const continents = ['america', 'europe', 'asia', 'africa', 'middleeast'];
  const coordinates = {
    america: { longitude: -98.35, latitude: 39.50 }, // Central US
    europe: { longitude: 10.45, latitude: 51.16 }, // Central Europe
    asia: { longitude: 104.195, latitude: 35.861 }, // Central China
    africa: { longitude: 21.093, latitude: -1.286 }, // Central Africa
    middleeast: { longitude: 42.818, latitude: 25.354 } // Central Middle East
  };

  const combinedData = continents.map((continent, index) => ({
    continent,
    posts: continentData2[index],
    ...coordinates[continent]
  }));
  

  const continentData = combinedData;

  return (
    <Container fluid>
      <h2 className="my-4">Tech Trends</h2>
      <Row className="mb-4">
        <Col md={4}>
          <DropdownButton id="dropdown-basic-button" title={region} onSelect={handleRegionSelect}>
            <Dropdown.Item eventKey="america">America</Dropdown.Item>
            <Dropdown.Item eventKey="europe">Europe</Dropdown.Item>
            <Dropdown.Item eventKey="asia">Asia</Dropdown.Item>
            <Dropdown.Item eventKey="africa">Africa</Dropdown.Item>
            <Dropdown.Item eventKey="middleeast">Middle East</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={4}>
          <DropdownButton id="dropdown-basic-button" title={genre} onSelect={handleGenreSelect}>
            <Dropdown.Item eventKey="AI">AI</Dropdown.Item>
            <Dropdown.Item eventKey="Blockchain">Blockchain</Dropdown.Item>
            <Dropdown.Item eventKey="IoT">IoT</Dropdown.Item>
            <Dropdown.Item eventKey="Aerospace">Aerospace</Dropdown.Item>
            <Dropdown.Item eventKey="Climate">Climate</Dropdown.Item>
            <Dropdown.Item eventKey="Energy">Energy</Dropdown.Item>
            <Dropdown.Item eventKey="Security">Security</Dropdown.Item>
            <Dropdown.Item eventKey="Military">Military</Dropdown.Item>
            <Dropdown.Item eventKey="MotorVehicles">MotorVehicles</Dropdown.Item>
            <Dropdown.Item eventKey="BioTech">BioTech</Dropdown.Item>
            <Dropdown.Item eventKey="Agric">Agric</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={4}>
          <Button variant="primary" onClick={handleShowModal}>
            Select Period
          </Button>
        </Col>
      </Row>

      {loading ? (
      <div>Loading...</div>
    ) : (
      <>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="metric-card">
              <Card.Body>
                <Card.Title> {numPosts}</Card.Title>
                <Card.Text>Number of Posts</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="metric-card">
              <Card.Body>
                <Card.Title> {mostPopularRegion}</Card.Title>
                <Card.Text>Region with Most Posts</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="metric-card">
              <Card.Body>
                <Card.Title>{mostPopularTag}</Card.Title>
                <Card.Text>Tag with Most Posts</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-4">
            {barData && <Bar data={barData} options={{ maintainAspectRatio: false }} height={300} />}
          </Col>
          <Col md={6} className="mb-4">
            {pieData && <Doughnut data={pieData} options={{ maintainAspectRatio: false }} height={300} />}
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mb-4">
            {lineData && <Line data={lineData} options={{ maintainAspectRatio: false }} height={300} />}
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mb-4">
            <div style={{ height: '400px', backgroundColor: '#f0f0f0', textAlign: 'center', lineHeight: '300px' }}>
              <MapBox data={continentData} />
            </div>
          </Col>
        </Row>
      </>
    )}
    
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Period</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMonth">
              <Form.Label>Month</Form.Label>
              <DropdownButton id="dropdown-month-button" title={month} onSelect={handleMonthSelect}>
                <Dropdown.Item eventKey="January">January</Dropdown.Item>
                <Dropdown.Item eventKey="February">February</Dropdown.Item>
                <Dropdown.Item eventKey="March">March</Dropdown.Item>
                <Dropdown.Item eventKey="April">April</Dropdown.Item>
                <Dropdown.Item eventKey="May">May</Dropdown.Item>
                <Dropdown.Item eventKey="June">June</Dropdown.Item>
                <Dropdown.Item eventKey="July">July</Dropdown.Item>
                <Dropdown.Item eventKey="August">August</Dropdown.Item>
                <Dropdown.Item eventKey="September">September</Dropdown.Item>
                <Dropdown.Item eventKey="October">October</Dropdown.Item>
                <Dropdown.Item eventKey="November">November</Dropdown.Item>
                <Dropdown.Item eventKey="December">December</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="formWeek">
              <Form.Label>Week</Form.Label>
              <DropdownButton id="dropdown-week-button" title={week} onSelect={handleWeekSelect}>
                <Dropdown.Item eventKey="Week 1">Week 1</Dropdown.Item>
                <Dropdown.Item eventKey="Week 2">Week 2</Dropdown.Item>
                <Dropdown.Item eventKey="Week 3">Week 3</Dropdown.Item>
                <Dropdown.Item eventKey="Week 4">Week 4</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <DropdownButton id="dropdown-year-button" title={year} onSelect={handleYearSelect}>
                <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
                <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
                <Dropdown.Item eventKey="2024">2024</Dropdown.Item>
                <Dropdown.Item eventKey="2025">2025</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Trends;
