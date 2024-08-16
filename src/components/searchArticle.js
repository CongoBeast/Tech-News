import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form , Badge, Stack, Breadcrumb, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';


function SearchArticle() {
    const [filter, setFilter] = useState('thisMonth');
    const [searchTerm, setSearchTerm] = useState('');
    const [articleCounts, setArticleCounts] = useState(0);
    const [articles, setArticles] = useState([]);


    const [selectedArticles, setSelectedArticles] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');


    const fetchArticles = (selectedFilter) => {
        axios.get('https://tech-news-backend.onrender.com/get-articles', {
            params: {
              filter: selectedFilter // Send the selected filter to the backend
            }
          })
            .then(response => {
                setArticles(response.data.reverse());
                setArticleCounts(response.data.length);
            })
            .catch(error => {
                console.error('There was an error fetching the articles!', error);
            });
    };

    const filteredArticles = articles.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    useEffect(() => {
        fetchArticles(filter); // Pass the current filter
      }, [filter]); // Re-fetch articles when the filter changes
    
      // Handle radio button change
      const handleFilterChange = (event) => {
        setFilter(event.target.value); // Update the filter state
      };

    // console.log(filteredArticles)
    const countDocumentsByRegion = (documents) => {
      return documents.reduce((acc, doc) => {
        const region = doc.region;
        acc[region] = (acc[region] || 0) + 1; // Increment count for the region
        return acc;
      }, {});
    };

    const regionCounts = countDocumentsByRegion(filteredArticles);

    // console.log(regionCounts)

    const handleCheckboxChange = (article) => {
      setSelectedArticles((prevSelectedArticles) => {
          if (prevSelectedArticles.includes(article)) {
              // If article is already selected, remove it
              return prevSelectedArticles.filter(a => a !== article);
          } else {
              // Otherwise, add the article to the array
              return [...prevSelectedArticles, article];
          }
      });
  };

  const handleSubmit = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setToastVariant('danger');
        setToastMessage('Please enter a valid email address.');
        setShowToast(true);
        return;
    }


    axios.post('https://mailslurp-backend.onrender.com/send-email', { selectedArticles, email })
        .then(response => {
            setToastVariant('success');
            setToastMessage('Email sent successfully');
            setSelectedArticles([])
        })
        .catch(error => {
            setToastVariant('danger');
            setToastMessage('Error sending email');
        })
        .finally(() => {
            setShowToast(true);
            setShowModal(false); // Close the modal after sending the email
        });
};


    return (
        <Container fluid className="home-container">

          <ToastContainer position="top-end" className="p-3">
              <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide color={'white'} bg={toastVariant}>
                  <Toast.Body>{toastMessage}</Toast.Body>
              </Toast>
          </ToastContainer>


        <Breadcrumb className='p-3 rounded'>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            <Badge bg="primary">Home</Badge>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
            <Badge bg="dark">Search Articles</Badge>
            </Breadcrumb.Item>
        </Breadcrumb>


            <h2 className="my-4 text-center">Search all articles here</h2>

            <Row className='d-flex justify-content-center align-items-center'>
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search Funding Entries"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4"
                    />
                </Col>
            </Row>


        <div className="mb-3">
                <Form.Check
                inline
                label="This Month"
                name="group1"
                type='radio'
                id={`thisMonth`}
                value="thisMonth" // Set value for this month
                checked={filter === 'thisMonth'} // Check if this is the selected filter
                onChange={handleFilterChange} // Handle change
                />
                <Form.Check
                inline
                label="All time"
                name="group1"
                type='radio'
                id={`All`}
                value="all" // Set value for all time
                checked={filter === 'all'} // Check if this is the selected filter
                onChange={handleFilterChange} // Handle change
                />
                <Form.Check
                inline
                label="Last Month"
                name="group1"
                type='radio'
                id={`lastMonth`}
                value="lastMonth" // Set value for last month
                checked={filter === 'lastMonth'} // Check if this is the selected filter
                onChange={handleFilterChange} // Handle change
                />
        </div>

              <Row>
                <Col md={2} xs="auto" className='align-items-center m-2'>
                  <Card style={{ background: '#f5b9a2' , color: 'Black' , width: '100px' }}>
                    <Card.Body>
                      <Card.Title>{regionCounts.africa}</Card.Title>
                      <Card.Text style={{ fontSize: '0.8rem' }} >Africa</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={2} xs="auto" className='align-items-center m-2'>
                  <Card style={{ background: '#a2c1f5' , color: 'Black', width: '100px' }}>
                    <Card.Body>
                      <Card.Title>{regionCounts.europe}</Card.Title>
                      <Card.Text style={{ fontSize: '0.8rem' }}>Europe</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={2} xs="auto" className='align-items-center m-2'>
                  <Card style={{ background: '#f5b9a2' , color: 'Black' , width: '100px' }}>
                    <Card.Body>
                      <Card.Title>{regionCounts.america}</Card.Title>
                      <Card.Text style={{ fontSize: '0.8rem' }} >America</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={2} xs="auto" className='align-items-center m-2'>
                  <Card style={{ background: '#f5b9a2' , color: 'Black' , width: '100px' }}>
                    <Card.Body>
                      <Card.Title>{regionCounts.asia}</Card.Title>
                      <Card.Text style={{ fontSize: '0.8rem' }} >Asia</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={2} xs="auto" className='align-items-center m-2'>
                  <Card style={{ background: '#f5b9a2' , color: 'Black', width: '100px' }}>
                    <Card.Body>
                      <Card.Title>{regionCounts.middleeast}</Card.Title>
                      <Card.Text style={{ fontSize: '0.8rem' }} >Middle East</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

              </Row>

              {selectedArticles.length > 0 && (
                <Row className="justify-content-center">
                    <Col md="auto" className="d-flex justify-content-center">
                        <Button className='m-1'
                            style={{
                                background: 'linear-gradient(90deg, rgba(29,151,108,1) 0%, rgba(0,0,0,1) 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                marginTop: '20px'
                            }}
                            onClick={() => setShowModal(true)}
                        >
                            Send these to my email
                        </Button>
                    </Col>
                </Row>
            
            )}

        <Row>
            {filteredArticles.map((article, idx) => (
            <Col key={idx} md={6} lg={4} className="mt-2 mb-4" style={{ fontSize: '0.8rem' }}>
                <Card className="article-card">
                <Form.Check aria-label="option 1" className='m-2' onChange={() => handleCheckboxChange(article)}/>
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    {article.country && <p>{article.country}</p>}
                    <Card.Text>{article.article}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    {/* <a href={article.link} className="btn btn-link p-0 mt-2">
                    Read full article
                    </a> */}

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

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Send Selected Articles</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit(email)}>
                    Send to Email
                </Button>
            </Modal.Footer>
        </Modal>


        </Container>
    );
}

export default SearchArticle;
