import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './RegionArticles.css';

function Article( articles){

    console.log(articles)

    return (

        <Row>
        {articles.articles.map((article, idx) => (
          <Col key={idx} md={6} lg={4} className="mb-4">
            <Card className="article-card">
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.article}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">{article.date}</span>
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
        ))}
      </Row>
    
    
    );
}

export default Article;