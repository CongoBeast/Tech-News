import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


function FundingPage() {
  const [fundingEntries, setFundingEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDelete = (id) => {
    axios.post('https://tech-news-backend.onrender.com/delete-article', { _id: id })
      .then(() => {
        fetchFundingEntries();
      })
      .catch(error => {
        console.error('Error deleting funding entry:', error);
      });
  };

  console.log(fundingEntries)

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

                  <FaEdit className="edit-icon mx-2" />
                  <FaTrashAlt className="delete-icon mx-2"  />
    
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FundingPage;
