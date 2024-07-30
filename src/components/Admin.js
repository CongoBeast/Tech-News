import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col, Form, Toast, ListGroup , Modal } from 'react-bootstrap';
import MetricsCards from './MetricsCards';
import axios from 'axios';
import { FaPaste } from 'react-icons/fa';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';



function Admin() {


  const [stats, setStats] = useState({
    numberOfPosts: 0,
    numberOfDrafts: 0,
    numberOfPostsThisWeek: 0,
  });
  const [recentArticles, setRecentArticles] = useState([]);
  const [recentFunding, setRecentFunding] = useState([]);
  const [articleLink, setArticleLink] = useState([]);
  const [currentArticleLink, setArticleLinkId] = useState({});


  useEffect(() => {
    fetchStats();
    fetchRecentArticles();
    fetchRecentFunding();
    fetchLinks();
  }, []);

  const fetchStats = () => {
    axios.get('https://tech-news-backend.onrender.com/get-stats')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  };

  const fetchRecentArticles = () => {
    axios.get('https://tech-news-backend.onrender.com/get-articles')
      .then(response => {
        const sortedArticles = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentArticles(sortedArticles.slice(0, 5));
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  };

  const fetchRecentFunding = () => {
    axios.get('https://tech-news-backend.onrender.com/funding-news')
      .then(response => {
        const sortedFunding = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentFunding(sortedFunding.slice(0, 5));
      })
      .catch(error => {
        console.error('Error fetching funding news:', error);
      });
  };

  const metrics = [
    { label: 'Number of Posts', value: stats.numberOfPosts },
    { label: 'Number of Drafts', value: stats.numberOfDrafts },
    { label: 'Posts this week', value: stats.numberOfPostsThisWeek },
    { label: 'Funding Posts', value: 25 },
  ];

  const truncateTitle = (title) => {
    return title.split(' ').length > 4 ? title.split(' ').slice(0, 4).join(' ') + '...' : title;
  };

  const userString = localStorage.getItem('user');
  const userType = localStorage.getItem('userType');

  const [show, setShow] = useState(false);
  const [link, setLink] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePaste = async (e , title) => {
    const text = await navigator.clipboard.readText();
    setLink(text);
  };

  const handleLinkSubmit = async () => {
    try {
      const response = await axios.post('https://tech-news-backend.onrender.com/submit-link', { link });
      if (response.status === 200) {
        setToastMessage('Link submitted successfully');
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage('Error submitting link');
      setShowToast(true);
    } finally {
      handleClose();
    }
  };


  const fetchLinks = () => {
    axios.get('https://tech-news-backend.onrender.com/article-links')
      .then(response => {
        setArticleLink(response.data);
        // console.log(response)
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  };


  const handleDeleteClick = (article) => {
    setArticleLinkId(article);
    axios.post('https://tech-news-backend.onrender.com/delete-links', { _id: article })
      .then(response => {

      })
      .catch(error => {
        console.error('There was an error deleting the article!', error);
      });
  };



  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome, {userString} </h1>
      <MetricsCards metrics={metrics} />
      <div className='d-flex justify-content-center'>
        <Button
          as={Link}
          to="/article-entry"
          className="btn btn-primary my-4"
          style={{ marginRight: "1rem" }}
        >
          Write Article
        </Button>
        <Button
          as={Link}
          to="/funding-entry"
          className="btn btn-success my-4"
        >
          Funding Entry
        </Button>
        <Button
          as={Link}
          to="/funding-page"
          className="btn btn-info my-4 mx-4"
        >
          View funding entries
        </Button>
        <Button
          as={Link}
          to="/articles-pages"
          className="btn btn-warning my-4 mx-4"
        >
          View article entries
        </Button>


        {userType !== 'regular' && ( // Conditional rendering based on userType
        <Button as={Link} to="/manage-users" className="btn btn-warning my-4 mx-4">
          Manage Users
        </Button>
      )}
      </div>

      {/* <Button variant="primary" onClick={handleShow}>
        Submit Article Link
      </Button> */}

      {/* <Row>
        <Col md={6}>
            <Card className='mb-4'>
                <Card.Header>Article Links</Card.Header>
                <ListGroup variant="flush">
                    {articleLink.map((article) => (
                      <ListGroup.Item key={article._id}>
                        <p>{article.link} </p>
                        <FaTrashAlt  onClick={handleDeleteClick(article._id)}/>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </Col>
      </Row> */}

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Recent Articles</Card.Header>
            <ListGroup variant="flush">
              {recentArticles.map((article) => (
                <ListGroup.Item key={article._id}>
                  <strong>{article.title}</strong>
                  <div><small>{new Date(article.date).toLocaleDateString()}</small></div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Recent Funding Entries</Card.Header>
            <ListGroup variant="flush">
              {recentFunding.map((funding) => (
                <ListGroup.Item key={funding._id}>
                  <strong>{truncateTitle(funding.startupName)}</strong>
                  <div><small>{new Date(funding.date).toLocaleDateString()}</small></div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter link"
                value={link}
                name='title'
                onChange={(e) => setLink(e.target.value)}
                onPaste={handlePaste}
              />
              <Button variant="outline-secondary" onClick={(e) => handlePaste(e, 'title')}>
                  <FaPaste />
                </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLinkSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: 'absolute', top: 20, right: 20 }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

    </div>

    
  );
}

export default Admin;
