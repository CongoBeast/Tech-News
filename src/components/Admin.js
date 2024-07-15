import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap';
import MetricsCards from './MetricsCards';
import axios from 'axios';

function Admin() {
  const [stats, setStats] = useState({
    numberOfPosts: 0,
    numberOfDrafts: 0,
    numberOfPostsThisWeek: 0,
  });
  const [recentArticles, setRecentArticles] = useState([]);
  const [recentFunding, setRecentFunding] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentArticles();
    fetchRecentFunding();
  }, []);

  const fetchStats = () => {
    axios.get('http://localhost:3001/get-stats')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  };

  const fetchRecentArticles = () => {
    axios.get('http://localhost:3001/get-articles')
      .then(response => {
        const sortedArticles = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentArticles(sortedArticles.slice(0, 5));
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  };

  const fetchRecentFunding = () => {
    axios.get('http://localhost:3001/funding-news')
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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome, Admin</h1>
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

        <Button
          as={Link}
          to="/articles-pages"
          className="btn btn-warning my-4"
        >
          Manage Users
        </Button>
      </div>
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
    </div>
  );
}

export default Admin;
