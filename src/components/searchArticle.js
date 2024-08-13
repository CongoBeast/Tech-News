import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form , Badge, Stack, Breadcrumb } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';


function SearchArticle() {
    const [searchTerm, setSearchTerm] = useState('');
    const [articleCounts, setArticleCounts] = useState(0);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = () => {
        axios.get('https://tech-news-backend.onrender.com/get-articles')
            .then(response => {
                setArticles(response.data);
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

    // console.log(filteredArticleEntries)

    return (
        <Container fluid className="home-container">

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

        </Container>
    );
}

export default SearchArticle;
