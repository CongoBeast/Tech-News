import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaPaste } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const regions = ['africa', 'asia', 'america', 'europe', 'middleeast'];
const tags = ['AI', 'BlockChain', 'Security', 'Aerospace', 'Climate', 'Energy', 'Military', 'MotorVehicles' , 
  'BioTech' , 'Agric' , 'FinTech' , 'Logistics'
];

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

function ArticleEntry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const userString = localStorage.getItem('user');
  
  const [articleData, setArticleData] = useState({
    _id: '',
    tag: '',
    link: '',
    region: '',
    title: '',
    article: '',
    date: '',
    week: '',
    month: '',
    year: '',
    status: '',
    username: userString
  });

  const [stats, setStats] = useState({
    numberOfPosts: 0,
    numberOfDrafts: 0,
    numberOfPostsThisWeek: 0
  });

  useEffect(() => {
    generateId();
  }, [articleData.region]);

  useEffect(() => {
    fetchStats();
  }, []);

  const generateId = () => {
    const randomId = [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setArticleData((prevData) => ({ ...prevData, _id: randomId }));
  };

  const fetchStats = () => {
    axios.get('https://tech-news-backend.onrender.com/get-stats')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      const selectedDate = new Date(value);
      const year = selectedDate.getFullYear().toString();
      const month = selectedDate.toLocaleString('default', { month: 'long' });
      const week = `Week ${Math.ceil(selectedDate.getDate() / 7)}`;

      setArticleData({
        ...articleData,
        [name]: value,
        year,
        month,
        week,
      });
    } else {
      setArticleData({ ...articleData, [name]: value });
    }
  };

  const handlePaste = async (e, name) => {
    const text = await navigator.clipboard.readText();
    setArticleData({ ...articleData, [name]: text });
  };

  const handleSubmit = (e, status) => {
    e.preventDefault();
    const updatedArticleData = { ...articleData, status };
    setLoading(true);
    setLoadingMessage(status === 'Posted' ? 'Submitting...' : 'Saving...');

    axios.post('https://tech-news-backend.onrender.com/submit-article', updatedArticleData)
      .then((response) => {
        toast.success(status === 'Posted' ? 'Article posted' : 'Draft saved');
        setArticleData({
          _id: '',
          tag: '',
          link: '',
          region: '',
          title: '',
          article: '',
          date: '',
          week: '',
          month: '',
          year: '',
          status: '',
          username: userString
        });
        fetchStats();
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

  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState('');
  const [articleLink, setArticleLink] = useState('');

  const handleArticleSubmit = () => {
    setSummaryLoading(true);

    axios.post('https://tech-news-backend.onrender.com/summarize-article', { link: articleLink })
      .then((response) => {
        setSummaryResult(response.data.summary);
        toast.success('Article summarized successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while summarizing the article. Please try again.');
      })
      .finally(() => {
        setSummaryLoading(false);
      });
  };

  var geminiData = []
  
  if(summaryResult.length > 0)
    // console.log(summaryResult)
    geminiData = JSON.parse(summaryResult.substring(7, summaryResult.length - 3))


  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const clickTitleFunction = () => {
    setIsTitleClicked(!isTitleClicked);
    navigator.clipboard.writeText(geminiData[0])
  };

  const clickSumFunction = () => {
    setIsClicked(!isClicked);
    navigator.clipboard.writeText(geminiData[1])
  };

  const divStyle = {
    width: '150px',
    height: '50px',
    backgroundColor: isClicked ? '#3cde5a' : 'darkgrey',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '8px',
    paddingTop: '5px'
  };

  const divTitleStyle = {
    width: '150px',
    height: '50px',
    backgroundColor: isTitleClicked ? '#3cde5a' : 'darkgrey',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '8px',
    paddingTop: '5px'
  };



  return (
    <Container>
      {loading && <LoadingOverlay message={loadingMessage} />}
      <h2 className="my-4">Enter New Article</h2>

      <Row className="my-4">
        <Col md={3}>
          <Form.Group controlId="articleLink">
            <Form.Label>Article Link</Form.Label>
            <Form.Control
              type="text"
              value={articleLink}
              onChange={(e) => setArticleLink(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button
            variant="primary"
            onClick={handleArticleSubmit}
            disabled={summaryLoading}
          >
            {summaryLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              'Submit Link'
            )}
          </Button>
        </Col>

        <Col md={3}>
          <Row>
            <div className='my-2' style={divTitleStyle} onClick={clickTitleFunction}><p>Title</p></div>
          </Row>
        </Col> 

        <Col md={3}>
            <Row>
              <div className='my-2' style={divStyle} onClick={clickSumFunction}><p>Summary</p></div>
              </Row> 
        </Col>

      </Row>


      {/* <Row className="my-4">
        <Col>
          <Form.Group controlId="summaryResult">
            <Form.Label>Summary Result</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={geminiData[0]}
              readOnly
            />
          </Form.Group>
        </Col>
      </Row> */}

      <Button
        as={Link}
        to="/articles-pages"
        className="btn btn-primary my-4"
        style={{ marginRight: "1rem" }}
      >
        View and Edit Articles
      </Button>

      <Form>
        <Row>
          <Col md={4}>
            <Form.Group controlId="_id" className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="_id"
                value={articleData._id}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="tag" className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                as="select"
                name="tag"
                value={articleData.tag}
                onChange={handleChange}
              >
                <option value="">Select Tag</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="region" className="mb-3">
              <Form.Label>Region</Form.Label>
              <Form.Control
                as="select"
                name="region"
                value={articleData.region}
                onChange={handleChange}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="title"
                  value={articleData.title}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={(e) => handlePaste(e, 'title')}>
                  <FaPaste />
                </Button>
              </div>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="link" className="mb-3">
              <Form.Label>Link</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="link"
                  value={articleData.link}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={(e) => handlePaste(e, 'link')}>
                  <FaPaste />
                </Button>
              </div>
            </Form.Group>
          </Col> 

          <Col md={4}>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={articleData.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group controlId="article" className="mb-3">
              <Form.Label>Article</Form.Label>
              <div className="d-flex">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="article"
                  value={articleData.article}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" onClick={(e) => handlePaste(e, 'article')}>
                  <FaPaste />
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
        
        <Row className='mb-5'>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e, 'Posted')}>
                Submit
              </Button>
              <Button variant="secondary" onClick={(e) => handleSubmit(e, 'Draft')}>
                Save as Draft
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
      
    </Container>
  );
}

export default ArticleEntry;
