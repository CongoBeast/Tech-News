import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './RegionArticles.css';

const genres = ['All', 'AI', 'BlockChain', 'Cybersecurity', 'IoT' , 'Energy' , 'Millitary'];

function RegionArticles() {

  const today = new Date();
  const weekNumber = today.toLocaleDateString('en-US', { week: 'numeric' });
  const monthString = today.toLocaleDateString('en-US', { month: 'long' });
  const year = today.getFullYear();

  var [articles, setArticles] = useState([]);
  const { region } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(`${monthString} ${year}, Week ${Math.ceil(today.getDate() / 7)}`);
  const [activeGenre, setActiveGenre] = useState('All');

  console.log(selectedPeriod)

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

  useEffect(() => {
    fetchArticles();
  }, [region, selectedMonth, selectedWeek, selectedYear, activeGenre]);

  const fetchArticles = () => {
    axios.get(`http://localhost:3001/get-articles?region=${region}`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the articles!', error);
      });
  };

  const filteredArticles = articles.filter(article => {
    const articleDate = new Date(article.date);
    const isActiveGenre = activeGenre === 'All' || article.tag.includes(activeGenre);
    const isInSelectedPeriod = articleDate.getFullYear() === selectedYear && 
                               articleDate.toLocaleString('default', { month: 'long' }) === selectedMonth && 
                               Math.ceil(articleDate.getDate() / 7) === selectedWeek;

    return isActiveGenre && isInSelectedPeriod;
  });

  
  articles = filteredArticles.filter(article => article.region === region);
  // console.log(articles)

  return (
    <Container fluid className="region-articles-container">
      <h2 className="my-4 text-center">{region.charAt(0).toUpperCase() + region.slice(1)}</h2>
      <p className="text-center">{selectedPeriod}</p>
      <div className="d-flex justify-content-center mb-4">
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
        <Button variant="secondary" className="mx-2" onClick={handleShowModal}>
          Select Period
        </Button>
      </div>
      
      <Row>
        {/* {articles.map((article, idx) => (
          <Col key={idx} md={6} lg={4} className="mb-4">
            <Card className="article-card">
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.article}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">{new Date(article.date).toLocaleDateString()}</span>
                  <div>
                    {article.tags.map((tag, index) => (
                      <span key={index} className="badge bg-primary me-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a href={article.link} className="btn btn-link p-0 mt-2">
                  Read full article
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))} */}

        {articles.map((article, idx) => (
          <Col key={idx} md={3} lg={6} className="mb-4">
            <Card className="article-card">
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.article}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">{new Date(article.date).toLocaleDateString()}</span>
                      <div>
                        
                      </div>
                    </div>
                    <a href={article.link} className="btn btn-link p-0 mt-2">
                      Read full article
                    </a>
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
