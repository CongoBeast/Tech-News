import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Select from 'react-select';

function FundingPage() {
  const [fundingEntries, setFundingEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBackers, setSelectedBackers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputBackers, setInputBacker] = useState('');
  
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
      { value: 'Beauty', label: 'Beauty' },
      { value: 'Manufacturing', label: 'Manufacturing' },
      { value: 'Health', label: 'Health' },
      { value: 'Education', label: 'Education' },
  
      { value: 'PropTech', label: 'PropTech' },
      { value: 'PropTech', label: 'Item5' },
      { value: 'RealEstate', label: 'RealEstate' },
      { value: 'B2B', label: 'B2B' },
      { value: 'Transport', label: 'Transport' },
  
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
      { value: 'Data analytics', label: 'Data analytics' },
  
      { value: 'GenAI', label: 'GenAI' },
      { value: 'AI', label: 'AI' },
      { value: 'Climate', label: 'Climate' },
      { value: 'Carbon', label: 'Carbon' },
      { value: 'Defense', label: 'Defense' },
      { value: 'Battery', label: 'Battery' },
      { value: 'Cyber Security', label: 'Cyber Security' },
      { value: 'Travel Tech', label: 'Travel Tech' }
  
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

  const handleEditSubmit = (e) => {

    const updatedEntry = {
      ...selectedEntry,
      founders: selectedItems.map(item => item.value),
      backers: selectedBackers.map(item => item.value),
      keyWords: selectedIndustry.map(item => item.value), // Add selected founders to the entry
    };

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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Funding Entries</h1>

      <Button as={Link} to="/funding-entry" className="btn btn-primary mb-4">
        Funding Entry
      </Button>
      
      <Form.Control
        type="text"
        placeholder="Search Funding Entries"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFundingEntries.map(entry => (
            <tr key={entry._id}>
              <td>{entry.startupName}</td>
              <td>{entry.date}</td>
              <td>
                <FaEdit className="edit-icon mx-2" onClick={() => { setSelectedEntry(entry); setShowEditModal(true); }} />
                <FaTrashAlt className="delete-icon mx-2" onClick={() => { setSelectedEntry(entry); setShowDeleteModal(true); }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Funding Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEntry && (

            <Form onSubmit={handleEditSubmit}>

            <Row>
                  <Col md={9}>
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
                </Row>


              <Form.Group controlId="startupName" className="mb-3">
                <Form.Label>Startup Name</Form.Label>
                <Form.Control
                  type="text"
                  name="startupName"
                  value={selectedEntry.startupName}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="date" className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={selectedEntry.date}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="dateFounded" className="mb-3">
                <Form.Label>Date Founded</Form.Label>
                <Form.Control
                  type="date"
                  name="dateFounded"
                  value={selectedEntry.dateFounded}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group controlId="country" className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={selectedEntry.country}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group controlId="founders" className="mb-3">
                <Form.Label>Founders</Form.Label>
                <input
                  type="text"
                  value={selectedEntry.founders}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
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

              <Form.Group controlId="backers" className="mb-3">
                <Form.Label>Backers</Form.Label>
                <input
                  type="text"
                  value={selectedEntry.backers}
                  onChange={(e) => setInputBacker(e.target.value)}
                  onKeyDown={handleKeyDownBackers}
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

              {/* Include other fields here */}
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>


          )}
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this entry?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FundingPage;
