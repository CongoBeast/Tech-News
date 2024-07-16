import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ArticleTable() {
  const [articles, setArticles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});
  const [articleCounts, setArticleCounts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleEditClick = (article) => {
    setCurrentArticle(article);
    setShowEditModal(true);
  };

  const handleDeleteClick = (article) => {
    setCurrentArticle(article);
    setShowDeleteModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentArticle({ ...currentArticle, [name]: value });
  };

  const handleEditSubmit = () => {
    axios.post('https://tech-news-backend.onrender.com/update-article', currentArticle)
      .then(response => {
        toast.success('Article updated successfully');
        setShowEditModal(false);
        fetchArticles();
      })
      .catch(error => {
        console.error('There was an error updating the article!', error);
        toast.error('Failed to update article');
      });
  };

  const handleDeleteConfirm = () => {
    axios.post('https://tech-news-backend.onrender.com/delete-article', { _id: currentArticle._id })
      .then(response => {
        toast.success('Article deleted successfully');
        setShowDeleteModal(false);
        fetchArticles();
      })
      .catch(error => {
        console.error('There was an error deleting the article!', error);
        toast.error('Failed to delete article');
      });
  };

  const filteredArticleEntries = articles.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ToastContainer />

      <h1 className="text-center mb-4">Article Entries</h1>

      <Button as={Link} to="/article-entry" className="btn btn-primary mb-4">
        Create article entry
      </Button>
      
      <Form.Control
        type="text"
        placeholder="Search Funding Entries"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Tag</th>
              <th>Region</th>
              <th>Date Posted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticleEntries.map((article, index) => (
              <tr key={index}>
                <td>{article._id}</td>
                <td>{article.title}</td>
                <td>{article.tag}</td>
                <td>{article.region}</td>
                <td>{article.date}</td>
                <td>
                  <FaEdit className="edit-icon mx-2" onClick={() => handleEditClick(article)} />
                  <FaTrashAlt className="delete-icon mx-2" onClick={() => handleDeleteClick(article)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="_id">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="_id"
                value={currentArticle._id}
                onChange={handleEditChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentArticle.title}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="tag">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="tag"
                value={currentArticle.tag}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="region">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                name="region"
                value={currentArticle.region}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="datePosted">
              <Form.Label>Date Posted</Form.Label>
              <Form.Control
                type="date"
                name="datePosted"
                value={currentArticle.datePosted}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this article?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ArticleTable;
