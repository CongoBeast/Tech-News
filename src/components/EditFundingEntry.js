import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Row, Col } from 'react-bootstrap';
import { Link , useLocation , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Select from 'react-select';


function EditFundingEntry() {
    const location = useLocation();
    const navigate = useNavigate();
    const [fundingEntries, setFundingEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const startup = location.state?.startup;

    const [selectedEntry, setSelectedEntry] = useState(startup);

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedBackers, setSelectedBackers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputBackers, setInputBacker] = useState('');

    

    // setSelectedEntry(startup)

    const fundingType = ['Seed' ,'Pre-seed'  , 'Pre-series B', 'Pre-series A', 'Series A', 'Series B', 'Series C', 'Series D' , 'Other'];

    // const fundingType = ['Seed' ,'Pre-seed'  , 'Pre-series B', 'Pre-series A', 'Series A', 'Series B', 'Series C', 'Series D' , 'Other'];


  // Adding funding rounds
  const [fundingRounds, setFundingRounds] = useState([
    { roundDate: '', fundingType: '', amount: '' }
  ]);

  const handleDateChange = (index, value) => {
    const updatedRounds = [...fundingRounds];
    updatedRounds[index].roundDate = value;
    setFundingRounds(updatedRounds);
  };

  const handleTypeChange = (index, value) => {
    const updatedRounds = [...fundingRounds];
    updatedRounds[index].fundingType = value;
    setFundingRounds(updatedRounds);
  };

  const handleAmountChange = (index, value) => {
    const updatedRounds = [...fundingRounds];
    updatedRounds[index].amount = value;
    setFundingRounds(updatedRounds);
  };

  const handleAddRound = () => {
    setFundingRounds([...fundingRounds, { dateFunded: '', fundingType: '', amount: '' }]);
  };
  // Adding funding rounds
  
  const handleKeyDown = (e) => {
      if (e.key === 'Enter' && inputValue.trim() !== '') {
        setSelectedItems([...selectedItems, { value: inputValue.trim() }]);
        setInputValue('');
      }
    };

  const handleKeyDownBackers = (e) => {
      if (e.key === 'Enter' && inputBackers.trim() !== '') {
        setSelectedBackers([...selectedBackers, { value: inputBackers.trim() }]);
        setInputBacker('');
      }
    };
  
  const removeItem = (itemToRemove) => {
      setSelectedItems(selectedItems.filter(item => item.value !== itemToRemove.value));
    };
  const removeBacker = (itemToRemove) => {
      setSelectedBackers(selectedBackers.filter(item => item.value !== itemToRemove.value));
    };

    const options = [
      { value: 'Hydrogen', label: 'Hydrogen' },
      { value: 'Energy', label: 'Energy' },
      { value: 'Solar', label: 'Solar' },
      { value: 'Semi Conductors', label: 'Semi Conductors' },
      { value: 'Clothing', label: 'Clothing' },
      { value: 'Fashion', label: 'Fashion' },
      
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
      { value: 'Ecomm', label: 'Ecomm' },
      
  
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


    const [selectedIndustry, setSelectedIndustry] = useState([]);
    const handleKeyWordChange = (selectedOptions) => {
      setSelectedIndustry(selectedOptions || []);
      // setFundingData({ ...fundingData, keyWords: selectedOptions ? selectedOptions.map(item => item.value) : [] });
    };

    const removeIndustry = (itemToRemove) => {
      // const updatedItems = selectedIndustry.filter(item => item.value !== itemToRemove.value);
      setSelectedIndustry(selectedIndustry.filter(item => item.value !== itemToRemove.value));
      // setFundingData({ ...fundingData, keyWords: updatedItems.map(item => item.value) });
    };

  useEffect(() => {
    fetchFundingEntries();
  }, []);

  const fetchFundingEntries = () => {
    axios.get('https://tech-news-backend.onrender.com/funding-news')
      .then(response => {
        setFundingEntries(response.data);
      })
      .catch(error => {
        console.error('Error fetching funding entries:', error);
      });
  };

  const handleDelete = () => {
    axios.post('https://tech-news-backend.onrender.com/delete-funding-entry', { _id: selectedEntry._id })
      .then(() => {
        fetchFundingEntries();
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error('Error deleting funding entry:', error);
      });
  };

      // console.log(selectedEntry)
      

      // console.log(newRounds)

      const handleEditSubmit = (e) => {

        var newRounds = [...fundingRounds , selectedEntry.rounds]

        const updatedEntry = {
          ...selectedEntry,
          founders: selectedItems.map(item => item.value),
          backers: selectedBackers.map(item => item.value),
          keyWords: selectedIndustry.map(item => item.value),
          rounds: newRounds, // Add selected founders to the entry
        };

        console.log(updatedEntry)
    
        e.preventDefault();
        axios.post('https://tech-news-backend.onrender.com/update-funding-entry', updatedEntry)
          .then(() => {
            fetchFundingEntries();
            setShowEditModal(false);
          })
          .catch(error => {
            console.error('Error updating funding entry:', error);
          });
      };
    
      const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedEntry({ ...selectedEntry, [name]: value });
      };
    
      const filteredFundingEntries = fundingEntries.filter(entry =>
        entry.startupName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      const randomColor = (index) =>{
        return (index % 2 === 1) ? 'lightgrey' : 'white';
      }
    


    return(

    <div className="container mt-5">
      <h1 className="text-center mb-4">Funding Entries</h1>

      <Button as={Link} to="/funding-entry" className="btn btn-primary m-4">
        Funding Entry
      </Button>

      <Button as={Link} to="/funding-page" className="btn btn-success m-4">
        All funding entries
      </Button>

      {selectedEntry && (

        <Form onSubmit={handleEditSubmit}>
        
            <Row>
                    <Col md={3}>
                        <Form.Label>Industries</Form.Label>
                        <Select
                        options={options}
                        isMulti
                        value={selectedIndustry}
                        onChange={handleKeyWordChange}
                        className="mb-3"
                        />
                        <div>
                        {selectedIndustry.map(item => (
                            <span key={item.value} className="badge text-black badge-pill badge-primary mr-2">
                            {item.value}
                            <button
                                type="button"
                                className="close ml-2 primary"
                                aria-label="Close"
                                onClick={() => removeIndustry(item)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </span>
                        ))}
                        </div>
                    </Col>

                    <Col md={3}>
                    <Form.Group controlId="startupName" className="mb-3">
                        <Form.Label>Startup Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="startupName"
                        value={selectedEntry.startupName}
                        onChange={handleEditChange}
                        />
                    </Form.Group>
                    </Col>

                    <Col md={3}>
                    <Form.Group controlId="date" className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                        type="date"
                        name="date"
                        value={selectedEntry.date}
                        onChange={handleEditChange}
                        />
                    </Form.Group>
                    </Col>

                    <Col md={3}>
                    <Form.Group controlId="dateFounded" className="mb-3">
                        <Form.Label>Date Founded</Form.Label>
                        <Form.Control
                        type="date"
                        name="dateFounded"
                        value={selectedEntry.dateFounded}
                        onChange={handleEditChange}
                        />
                    </Form.Group>
                    </Col>
            </Row>


            <Row>

                <Col md={4}>
                <Form.Group controlId="founders" className="mb-3">
                    <Form.Label>Founders</Form.Label>
                    <input
                    type="text"
                    value={selectedEntry.founders}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    //  onKeyDown={(e) => {
                    //   if (e.key === 'Enter') {
                    //     e.preventDefault();
                    //     handleKeyDown(e);  // Call the handler on Enter key press
                    //   }
                    // }}
                    className="form-control mb-3"
                    placeholder="Type and press Enter"
                    />
                    <div>
                    {selectedItems.map(item => (
                        <span key={item.value} className="badge text-black badge-pill badge-primary mr-2">
                        {item.value}
                        <button
                            type="button"
                            className="close ml-2"
                            aria-label="Close"
                            onClick={() => removeItem(item)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </span>
                    ))}
                    </div>
                </Form.Group>                
                </Col>

                <Col md={4}>
                <Form.Group controlId="backers" className="mb-3">
                    <Form.Label>Backers</Form.Label>
                    <input
                    type="text"
                    value={selectedEntry.backers}
                    onChange={(e) => setInputBacker(e.target.value)}
                    onKeyDown={handleKeyDownBackers}
                    // onKeyDown={(e) => {
                    //   if (e.key === 'Enter') {
                    //     e.preventDefault();
                    //     handleKeyDownBackers(e);  // Call the handler on Enter key press
                    //   }
                    // }}
                    className="form-control mb-3"
                    placeholder="Type and press Enter"
                    />
                    <div>
                    {selectedBackers.map(item => (
                        <span key={item.value} className="badge text-black badge-pill badge-primary mr-2">
                        {item.value}
                        <button
                            type="button"
                            className="close ml-2"
                            aria-label="Close"
                            onClick={() => removeBacker(item)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </span>
                    ))}
                    </div>
                </Form.Group>
                </Col>

                <Col md={3}>
                <Form.Group controlId="country" className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    type="text"
                    name="country"
                    value={selectedEntry.country}
                    onChange={handleEditChange}
                    />
                </Form.Group>
                </Col>

            </Row>
        
        

        <Row>
        {fundingRounds.map((round, index) => (
            <div key={index}  style={{backgroundColor: randomColor(index)}}>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId={`dateFounded-${index}`} className="mb-3">
                            <Form.Label>Date Funded</Form.Label>
                            <Form.Control
                            type="date"
                            value={round.dateFunded}
                            onChange={(e) => handleDateChange(index, e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group controlId={`fundingType-${index}`} className="mb-3">
                            <Form.Label>Funding Type</Form.Label>
                            <Form.Control
                            as="select"
                            value={round.fundingType}
                            onChange={(e) => handleTypeChange(index, e.target.value)}
                            >
                            <option value="">Select funding type</option>
                            {fundingType.map((region) => (
                                <option key={region} value={region}>{region}</option>
                                ))}
                            {/* Add your options dynamically here */}
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group controlId={`amount-${index}`} className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="text"
                            value={round.amount}
                            onChange={(e) => handleAmountChange(index, e.target.value)}
                        />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            ))}
            
        </Row>


        {/* Include other fields here */}
        <Button variant="primary" className='m-3' type="submit">
            Save Changes
        </Button>

        <Button variant="success"  className='m-3' onClick={handleAddRound}>Add Funding Round</Button>
        </Form>


)}
    




    </div>
      

);
}

export default EditFundingEntry;