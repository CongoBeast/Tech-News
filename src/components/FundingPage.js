import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function FundingPage() {
  const [fundingEntries, setFundingEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

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
    e.preventDefault();
    axios.post('https://tech-news-backend.onrender.com/update-funding-entry', selectedEntry)
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
                <Form.Control
                  type="text"
                  name="founders"
                  value={selectedEntry.founders}
                  onChange={handleEditChange}
                />
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
