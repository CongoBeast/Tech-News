import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown, Modal , Breadcrumb, Badge, Stack } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import './RegionArticles.css';

const genres = ['All', 'AI', 'BlockChain', 'Cybersecurity', 'IoT', 'Energy', 'Military'];

function RegionArticles() {
  const today = new Date();
  const weekNumber = today.toLocaleDateString('en-US', { week: 'numeric' });
  const monthString = today.toLocaleDateString('en-US', { month: 'long' });
  const year = today.getFullYear();

  const [articles, setArticles] = useState([]);
  const { region } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(`${monthString} ${year}, Week ${Math.ceil(today.getDate() / 7)}`);
  const [activeGenre, setActiveGenre] = useState('All');

  const [selectedWeek, setSelectedWeek] = useState(Math.ceil(today.getDate() / 7));
  const [selectedMonth, setSelectedMonth] = useState(monthString);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePeriodChange = (month, week, year) => {
    setSelectedMonth(month);
    setSelectedWeek(week);
    setSelectedYear(year);
    setSelectedPeriod(`${month} ${year}, Week ${week}`);
    setShowModal(false);
  };

  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };


  useEffect(() => {
    fetchArticles();
  }, [region, selectedMonth, selectedWeek, selectedYear, activeGenre]);

  const fetchArticles = () => {
    axios.get(`https://tech-news-backend.onrender.com/get-articles?region=${region}`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the articles!', error);
      });
  };

  var filteredArticles = articles.filter(article => {
    const articleDate = new Date(article.date);
    const isActiveGenre = activeGenre === 'All' || article.tag.includes(activeGenre);
    const isInSelectedPeriod = articleDate.getFullYear() === selectedYear && 
                               articleDate.toLocaleString('default', { month: 'long' }) === selectedMonth && 
                               Math.ceil(articleDate.getDate() / 7) === selectedWeek;

    return isActiveGenre && isInSelectedPeriod;
  });

  filteredArticles = filteredArticles.filter(article => article.region === region);

  return (
    <Container fluid className="region-articles-container">

            {/* Breadcrumbs */}
      <Breadcrumb className='p-3 rounded'>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          <Badge bg="primary">Home</Badge>
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        <Badge bg="primary">Regions</Badge>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
           <Badge bg="dark">{region.charAt(0).toUpperCase() + region.slice(1)}</Badge>
        </Breadcrumb.Item>
      </Breadcrumb>


      <h2 className="my-4 text-center">{region.charAt(0).toUpperCase() + region.slice(1)}</h2>
      <p className="text-center">{selectedPeriod}</p>
      <div className="d-flex justify-content-center mb-4">
        <div className="d-none d-md-block">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={activeGenre === genre ? 'primary' : 'outline-primary'}
              className="mx-2"
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </Button>
          ))}
        </div>
        <div className="d-block d-md-none">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {activeGenre}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {genres.map((genre) => (
                <Dropdown.Item key={genre} onClick={() => setActiveGenre(genre)}>
                  {genre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Button variant="secondary" className="mx-2 mx-md-0 mt-2 mt-md-0" onClick={handleShowModal}>
          Select Period
        </Button>
      </div>
      
      <Row>
        {filteredArticles.map((article, idx) => (
          <Col key={idx} md={6} lg={4} className="mb-4" style={{ fontSize: '0.8rem' }}>
            <Card className="article-card">
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.article}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <a href={article.link} className="btn btn-link p-0 mt-2">
                  Read full article
                </a>

                {article.keyWords && <Stack direction="horizontal" gap={2} className='mt-2'>
                {article.keyWords.map((keyword, index) => (
                  <Badge key={index} pill bg={getRandomColor()} text={keyword === 'light' ? 'dark' : ''}>
                    {keyword}
                  </Badge>
                ))}
              </Stack>}

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Period</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-month">
              {selectedMonth}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
                (month) => (
                  <Dropdown.Item key={month} onClick={() => setSelectedMonth(month)}>
                    {month}
                  </Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-week" className="mt-2">
              Week {selectedWeek}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[1, 2, 3, 4].map((week) => (
                <Dropdown.Item key={week} onClick={() => setSelectedWeek(week)}>
                  Week {week}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-year" className="mt-2">
              {selectedYear}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" className="mt-3" onClick={() => handlePeriodChange(selectedMonth, selectedWeek, selectedYear)}>
            Confirm Period
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default RegionArticles;
