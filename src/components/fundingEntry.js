import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaPaste } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const regions = ['africa', 'asia', 'america', 'europe', 'middleeast'];
const fundingType = ['Seed' ,'Pre-seed'  , 'Pre-series B', 'Pre-series A', 'Series A', 'Series B', 'Series C', 'Series D' , 'Other'];
const tags = ['AI', 'BlockChain', 'Security', 'Aerospace', 'Climate', 'Energy', 'Military', 'MotorVehicles' , 'FinTech' , 'BioTech' , 'Agric' , 'Logistics' , 'Ecommerce'];

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

  const options = [
    { value: 'Hydrogen', label: 'Hydrogen' },
    { value: 'Energy', label: 'Energy' },
    { value: 'Solar', label: 'Solar' },
    
    { value: 'Beauty', label: 'Beauty' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Health', label: 'Health' },
    { value: 'Mental Health', label: 'Mental Health' },
    { value: 'Drug Discovery', label: 'Drug Discovery' },
    
    { value: 'Education', label: 'Education' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Media', label: 'Media' },
    { value: 'Advertising', label: 'Advertising' },
    { value: 'Virtual Reality', label: 'Virtual Reality' },
    

    { value: 'PropTech', label: 'PropTech' },
    { value: 'Investing', label: 'Investing' },
    { value: 'RealEstate', label: 'RealEstate' },
    
    { value: 'B2B', label: 'B2B' },
    { value: 'Saas', label: 'Saas' },
    { value: 'Paas', label: 'Paas' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Robotics', label: 'Robotics' },
    
    { value: 'Transport', label: 'Transport' },
    { value: 'Logistics', label: 'Logistics' },

    { value: 'Finance', label: 'Finance' },
    { value: 'Digital finance', label: 'Digital finance' },
    { value: 'Accessibility', label: 'Accessibility' },
    { value: 'Lending', label: 'Lending' },
    { value: 'Cryptocurrency', label: 'Cryptocurrency' },
    
    { value: 'Regtech', label: 'Regtech' },
    { value: 'Insurtech', label: 'Insurtech' },
    { value: 'Wealthtech', label: 'Wealthtech' },
    { value: 'BNPL', label: 'BNPL' },
    
    { value: 'Cloud computing', label: 'Cloud computing' },
    { value: 'Quantum Computing', label: 'Quantum Computing' },
    { value: 'Data analytics', label: 'Data analytics' },

    { value: 'GenAI', label: 'GenAI' },
    { value: 'AI', label: 'AI' },
    { value: 'Climate', label: 'Climate' },
    { value: 'Carbon', label: 'Carbon' },
    { value: 'Defense', label: 'Defense' },
    { value: 'Battery', label: 'Battery' },
    { value: 'Cyber Security', label: 'Cyber Security' },
    
    { value: 'Travel Tech', label: 'Travel Tech' },
    { value: 'Electric Vehicles', label: 'Electric Vehicles' },
    { value: 'Mining', label: 'Mining' },
    { value: 'HRTech', label: 'HRTech' },
    { value: 'Social', label: 'Social' },
    
    { value: 'Air Travel', label: 'Air Travel' },
    { value: 'Space', label: 'Space' }
    

  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const handleKeyWordChange = (selectedOptions) => {
    setSelectedItems(selectedOptions || []);
    setFundingData({ ...fundingData, keyWords: selectedOptions ? selectedOptions.map(item => item.value) : [] });
  };

  const removeItem = (itemToRemove) => {
    const updatedItems = selectedItems.filter(item => item.value !== itemToRemove.value);
    setSelectedItems(selectedItems.filter(item => item.value !== itemToRemove.value));
    setFundingData({ ...fundingData, keyWords: updatedItems.map(item => item.value) });
  };


  const userString = localStorage.getItem('user');

  const [fundingData, setFundingData] = useState({
    _id: '',
    startupName: '',
    type: '',
    size: '',
    country: '',
    region: '',
    tag: '',
    imageLink: '',
    siteLink: '',
    description: '',
    careersLink: '',
    date: '',
    week: '',
    month: '',
    year: '',
    username: userString,
    keyWords: []
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

    const dataToSubmit = { ...fundingData, keyWords: selectedItems.map(item => item.value) };

    axios.post('https://tech-news-backend.onrender.com/submit-funding-news',  dataToSubmit)
      .then((response) => {
        toast.success('Funding news submitted');
        setFundingData({
          _id: '',
          startupName: '',
          type: '',
          size: '',
          country: '',
          region: '',
          tag: '',
          imageLink: '',
          siteLink: '',
          description: '',
          careersLink: '',
          date: '',
          week: '',
          month: '',
          year: '',
          username: userString,
          keyWords: []
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

  const [isSummaryClicked, setIsSummaryClicked] = useState(false);
  const [isNameClicked, setIsNameClicked] = useState(false);
  const [isCareerClicked, setIsCareerClicked] = useState(false);


  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState('');
  const [articleLink, setArticleLink] = useState('');

  const handleArticleSubmit = () => {
    setSummaryLoading(true);

    axios.post('https://tech-news-backend.onrender.com/summarize-company', { link: articleLink })
      .then((response) => {
        setSummaryResult(response.data.summary);
        // toast.success('Article summarized successfully');
        alert("Summarized")
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while summarizing the article. Please try again.');
        alert("There was an error")
      })
      .finally(() => {
        setSummaryLoading(false);
      });
  };

  
  var geminiData = []

  // console.log(summaryResult.length)

  if(summaryResult.length > 0){
    try {
    // console.log(summaryResult.substring(7, summaryResult.length - 3))
    geminiData = JSON.parse(summaryResult.substring(7, summaryResult.length - 5)) }
    catch (error) {
      console.error("Failed to parse JSON:", error);
    }
    
    // console.log(geminiData[0].summary)
  }

  const clickSummaryFunction = () => {
        console.log(geminiData[0].summary)
        setIsSummaryClicked(!isSummaryClicked);
        navigator.clipboard.writeText(geminiData[0].summary)
    };

  const clickNameFunction = () => {
      setIsNameClicked(!isNameClicked);
      // console.log(geminiData[0].company_name)
      navigator.clipboard.writeText(geminiData[0].company_name)
    };

  const clickCareerFunction = () => {
      setIsCareerClicked(!isCareerClicked);
      // console.log(geminiData[0].careers_page_link)
      navigator.clipboard.writeText(geminiData[0].careers_page_link)
    };

  
    
    

      
    


      // console.log(selectedItems)
    
    
// careers_page_link

  return (
    <Container>
      {loading && <LoadingOverlay message={loadingMessage} />}
      <h2 className="my-4">Enter Funding News</h2>

    <Row>
      <Col md={9}>
        <Select
          options={options}
          isMulti
          value={selectedItems}
          onChange={handleKeyWordChange}
          className="mb-3"
        />
        <div>
          {selectedItems.map(item => (
            <span key={item.value} className="badge text-black badge-pill badge-primary mr-2">
              {item.value}
              <button
                type="button"
                className="close ml-2 primary"
                aria-label="Close"
                onClick={() => removeItem(item)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </span>
          ))}
        </div>
      </Col>
    </Row>

      <ToastContainer />
      {/* <Row className="my-4">
        <Col md={4}>
          <Form.Group controlId="articleLink">
            <Form.Label>Article Link</Form.Label>
            <Form.Control
              type="text"
              value={articleLink}
              onChange={(e) => setArticleLink(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={8} className="d-flex align-items-end">
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
              'Sub Link'
            )}
          </Button>

          <Button variant={isSummaryClicked ? "primary" : "success"} className='mx-2' onClick={clickSummaryFunction}>Summary</Button>
            <Button variant={isCareerClicked ? "primary" : "success" } className='mx-2' onClick={clickCareerFunction}>Careers</Button>
            <Button variant={isNameClicked ? "primary" : "success" } onClick={clickNameFunction}>Name</Button>
        </Col>
      </Row> */}
        {/* <Col md={4} className="d-flex align-items-end">
            <Button variant={isSummaryClicked ? "primary" : "success"} className='mx-2' onClick={clickSummaryFunction}>Summary</Button>
            <Button variant={isCareerClicked ? "primary" : "success" } onClick={clickCareerFunction}>Careers</Button>
            <Button variant={isNameClicked ? "primary" : "success" } onClick={clickNameFunction}>Name</Button>
        </Col> */}

      {/* <Row className="my-4">
        <Col>
          <Form.Group controlId="summaryResult">
            <Form.Label>Summary Result</Form.Label>
            <Form.Control
              as="textarea"
              rows={7}
              value={summaryResult.substring(13, summaryResult.length - 7)}
              readOnly
            />
          </Form.Group>
        </Col>
      </Row> */}



      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
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
          <Col md={4}>
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

          <Col md={4}>
            {/* <Form.Group controlId="type" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={fundingData.type}
                onChange={handleChange}
              />
              <option value="">Select Type</option>
                {fundingType.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
            </Form.Group> */}

            <Form.Group controlId="type" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={fundingData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                {fundingType.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

        </Row>

        <Row>
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

          <Col md={6}>
            <Form.Group controlId="country" className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={fundingData.country}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
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
          <Col md={4}>
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
          
          <Col md={4}>
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
          <Col md={4}>
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
          <Col md={4}>
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

          <Col md={4}>
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
        </Row>

        <Row>
          
 
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
