import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown, Modal, Breadcrumb, Badge, Stack, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import './RegionArticles.css';

const genres = ['All', 'AI', 'BlockChain', 'Cybersecurity', 'BioTech', 'Energy', 'Military'];

function RegionArticles() {
  const today = new Date();
  const weekNumber = today.toLocaleDateString('en-US', { week: 'numeric' });
  const monthString = today.toLocaleDateString('en-US', { month: 'long' });
  const year = today.getFullYear();
  const [filter, setFilter] = useState('thisMonth');
  const [articles, setArticles] = useState([]);
  const { region } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(`${monthString} ${year}, Week ${Math.ceil(today.getDate() / 7)}`);
  const [activeGenre, setActiveGenre] = useState('All');
  const [selectedWeek, setSelectedWeek] = useState(Math.ceil(today.getDate() / 7));
  const [selectedMonth, setSelectedMonth] = useState(monthString);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [analysisVisibility, setAnalysisVisibility] = useState({});


  // New state variables for analysis and loading
  const [analysis, setAnalysis] = useState({});
  const [loading, setLoading] = useState({});

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePeriodChange = (month, week, year) => {
    setFilter('all');
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

  const handleAnalysis = async (article, idx) => {
    setLoading(prevLoading => ({ ...prevLoading, [idx]: true }));
    
    try {
      const response = await axios.post('https://cordelia-analyze.onrender.com/analyze', { documents: [article] });
      setAnalysis(prevAnalysis => ({ ...prevAnalysis, [idx]: response.data.analysis }));
      setAnalysisVisibility(prevState => ({ ...prevState, [idx]: true }));
    } catch (error) {
      console.error('There was an error fetching the analysis!', error);
    } finally {
      setLoading(prevLoading => ({ ...prevLoading, [idx]: false }));
    }
  };

  var filteredArticles = articles.filter(article => {
    const articleDate = new Date(article.date);
    const isActiveGenre = activeGenre === 'All' || article.tag.includes(activeGenre);
    const isInSelectedPeriod = articleDate.getFullYear() === selectedYear && 
                               articleDate.toLocaleString('default', { month: 'long' }) === selectedMonth && 
                               Math.ceil(articleDate.getDate() / 7) === selectedWeek;

    return isActiveGenre && isInSelectedPeriod;
  });

  filteredArticles = filteredArticles.filter(article => article.region === region).reverse();

  const toggleAnalysisVisibility = (articleId) => {
    setAnalysisVisibility(prevState => ({
      ...prevState,
      [articleId]: !prevState[articleId],
    }));
  };
  

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

                {/* <Button
                  variant="primary"
                  onClick={() => handleAnalysis(article, idx)}
                  disabled={loading[idx]}
                >
                  {loading[idx] ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Quick analysis'}
                </Button>

                {analysis[idx] && (
                  <div className="mt-3">
                    <strong>Analysis:</strong>
                    <p>{analysis[idx]}</p>
                  </div>
                )} */}
                {loading[idx] ? (
              <Button 
                variant="secondary" 
                disabled 
                style={{
                  display: 'block',
                  margin: '10px auto',
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.5rem'
                }}>
                <Spinner 
                  as="span" 
                  animation="border" 
                  size="sm" 
                  role="status" 
                  aria-hidden="true" 
                />
                Loading...
              </Button>
            ) : (
              <Button 
                variant="primary" 
                onClick={() => handleAnalysis(article, idx)}
                style={{
                  display: 'block',
                  margin: '10px auto',
                  background: 'linear-gradient(90deg, rgba(58,123,213,1) 0%, rgba(52,82,242,1) 50%, rgba(79,110,249,1) 100%)',
                  border: 'none',
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.5rem'
                }}>
                Quick analysis
              </Button>
            )}

            {analysis[idx] && analysisVisibility[idx] && (
              <div className="mt-3">
                <strong>Analysis:</strong>
                <p>{analysis[idx]}</p>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => toggleAnalysisVisibility(idx)}
                  style={{
                    display: 'block',
                    margin: '10px auto',
                    fontSize: '0.8rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'black',
                    color: 'white'
                  }}>
                  Hide
                </Button>
              </div>
            )}

{analysis[idx] && !analysisVisibility[idx] && (
  <Button 
    variant="outline-secondary" 
    onClick={() => toggleAnalysisVisibility(idx)}
    style={{
      display: 'block',
      margin: '10px auto',
      fontSize: '0.8rem',
      padding: '0.25rem 0.5rem',
      backgroundColor: 'green',
      color: 'white'
    }}>
    Show Analysis
  </Button>
)}



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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlePeriodChange(selectedMonth, selectedWeek, selectedYear)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegionArticles;
