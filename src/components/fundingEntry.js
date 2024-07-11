import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaPaste } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const regions = ['africa', 'asia', 'america', 'europe', 'middleeast'];
const tags = ['AI', 'BlockChain', 'Security', 'Aerospace', 'Climate', 'Energy', 'Military', 'MotorVehicles'];

function LoadingOverlay({ message }) {
  return (
    <div className="loading-overlay">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <p>{message}</p>
    </div>
  );
}

function FundingEntry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const [fundingData, setFundingData] = useState({
    _id: '',
    startupName: '',
    type: '',
    size: '',
    region: '',
    tag: '',
    imageLink: '',
    siteLink: '',
    description: '',
    careersLink: '',
    date: '',
    week: '',
    month: '',
    year: ''
  });

  useEffect(() => {
    generateId();
  }, [fundingData.region]);

  const generateId = () => {
    const randomId = [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setFundingData((prevData) => ({ ...prevData, _id: randomId }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      const selectedDate = new Date(value);
      const year = selectedDate.getFullYear().toString();
      const month = selectedDate.toLocaleString('default', { month: 'long' });
      const week = `Week ${Math.ceil(selectedDate.getDate() / 7)}`;

      setFundingData({
        ...fundingData,
        [name]: value,
        year,
        month,
        week,
      });
    } else {
      setFundingData({ ...fundingData, [name]: value });
    }
  };

  const handlePaste = async (e, name) => {
    const text = await navigator.clipboard.readText();
    setFundingData({ ...fundingData, [name]: text });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingMessage('Submitting...');

    axios.post('http://localhost:3001/submit-funding-news', fundingData)
      .then((response) => {
        toast.success('Funding news submitted');
        setFundingData({
          _id: '',
          startupName: '',
          type: '',
          size: '',
          region: '',
          tag: '',
          imageLink: '',
          siteLink: '',
          description: '',
          careersLink: '',
          date: '',
          week: '',
          month: '',
          year: ''
        });
        navigate('/admin');
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      {loading && <LoadingOverlay message={loadingMessage} />}
      <h2 className="my-4">Enter Funding News</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="_id" className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="_id"
                value={fundingData._id}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="startupName" className="mb-3">
              <Form.Label>Startup Name</Form.Label>
              <Form.Control
                type="text"
                name="startupName"
                value={fundingData.startupName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="type" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={fundingData.type}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="size" className="mb-3">
              <Form.Label>Size ($)</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={fundingData.size}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="region" className="mb-3">
              <Form.Label>Region</Form.Label>
              <Form.Control
                as="select"
                name="region"
                value={fundingData.region}
                onChange={handleChange}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="tag" className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                as="select"
                name="tag"
                value={fundingData.tag}
                onChange={handleChange}
              >
                <option value="">Select Tag</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="imageLink" className="mb-3">
              <Form.Label>Image Link</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="imageLink"
                  value={fundingData.imageLink}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={(e) => handlePaste(e, 'imageLink')}>
                  <FaPaste />
                </Button>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="siteLink" className="mb-3">
              <Form.Label>Site Link</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="siteLink"
                  value={fundingData.siteLink}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={(e) => handlePaste(e, 'siteLink')}>
                  <FaPaste />
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="careersLink" className="mb-3">
              <Form.Label>Careers Link</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="careersLink"
                  value={fundingData.careersLink}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={(e) => handlePaste(e, 'careersLink')}>
                  <FaPaste />
                </Button>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={fundingData.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <div className="d-flex">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={fundingData.description}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={(e) => handlePaste(e, 'description')}>
                  <FaPaste />
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default FundingEntry;
