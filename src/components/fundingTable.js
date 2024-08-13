import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaStepBackward , FaStepForward } from "react-icons/fa";
import { Button, Table, Form, Modal, Row, Col, Card } from 'react-bootstrap';



function FundingTable({ rows }) {
  const navigate = useNavigate();
  const [filteredRows, setFilteredRows] = useState(rows);
  const [filters, setFilters] = useState({
    year: '',
    month: '',
    tag: '',
    region: '',
    size: '',
    type: ''
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 16;

  useEffect(() => {
    applyFilters();
  }, [filters, rows]);

  const handleRowClick = (row) => {
    navigate(`/startup/${row._id}`, { state: { startup: row } });
  };

  const formatSize = (sizeString) => {
    if (!sizeString || isNaN(parseFloat(sizeString))) {
      return 'N/A';
    }

    const number = parseFloat(sizeString.replace(/,/g, ''));
    const millions = number / 1000000;

    if (millions < 1) {
      return number.toLocaleString('en-US', { maximumFractionDigits: 0 });
    } else {
      return `${millions.toFixed(1)} million`;
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = [...rows];

    if (filters.year) {
      filtered = filtered.filter(row => new Date(row.date).getFullYear().toString() === filters.year);
    }

    if (filters.month) {
      filtered = filtered.filter(row => new Date(row.date).getMonth().toString() === filters.month);
    }

    if (filters.tag) {
      filtered = filtered.filter(row => row.tag.toLowerCase().includes(filters.tag.toLowerCase()));
    }

    if (filters.region) {
      filtered = filtered.filter(row => row.region.toLowerCase().includes(filters.region.toLowerCase()));
    }

    if (filters.size) {
      filtered = filtered.filter(row => row.size.toLowerCase().includes(filters.size.toLowerCase()));
    }

    if (filters.type) {
      filtered = filtered.filter(row => row.type.toLowerCase().includes(filters.type.toLowerCase()));
    }

    setFilteredRows(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleSort = () => {
    const sorted = [...filteredRows].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredRows(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);


  const generateFileName = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `cordelia_${year}-${month}-${day}.csv`;
  };

  var fileName = generateFileName()

  // console.log(displayedRows) 
  const convertToCSV = (array) => {
    const headers = Object.keys(array[0]).join(','); // Extract headers
    const rows = array.map(row => 
      Object.values(row).map(value => `"${value}"`).join(',')
    ).join('\n'); // Convert each object to a CSV row

    return `${headers}\n${rows}`;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(filteredRows);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }; 
  

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-12 col-md">
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-12 col-md">
          <input
            type="text"
            name="month"
            placeholder="Month"
            value={filters.month}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-12 col-md">
          <input
            type="text"
            name="tag"
            placeholder="Tag"
            value={filters.tag}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-12 col-md">
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={filters.region}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-12 col-md">
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={filters.size}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-12 col-md">
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={filters.type}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
      
      <Row>
        <Col>
          <Button className='success m-3' onClick={downloadCSV}>
            Export as CSV
          </Button>
        </Col>
      </Row>

      </div>
      {/* <div className="table-responsive">
        <table className="table table-hover" style={{ fontSize: '0.8rem' }}>
          <thead style={{ backgroundColor: '#000', color: '#fff' }}>
            <tr>
              <th scope="col">Startup Name</th>
              <th scope="col" className="text-right">Type</th>
              <th scope="col" className="text-right">Size ($)</th>
              <th scope="col" className="text-right">Region</th>
              <th scope="col" className="text-right">Tag</th>
              <th scope="col" className="text-right" onClick={handleSort} style={{ cursor: 'pointer' }}>
                Date {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row) => (
              <tr key={row._id} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
                <td>{row.startupName}</td>
                <td className="text-right">{row.type}</td>
                <td className="text-right">{formatSize(row.size)}</td>
                <td className="text-right">{row.region}</td>
                <td className="text-right">{row.tag}</td>
                <td className="text-right">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}


        <Row className='d-flex justify-content-center align-items-center'>
          {displayedRows.map((row) => (
                <Card onClick={() => handleRowClick(row)} className='m-3' style={{ width: '12rem', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer' }}>

                <Row noGutters={true} className="d-flex align-items-center">
                  <Col xs={4}>
                    <Card.Img 
                      src={row.imageLink} 
                      style={{ borderRadius: '0', height: '100%', objectFit: 'cover' }}
                    />
                  </Col>

                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title>{row.startupName}</Card.Title>
                      <Card.Text style={{ fontSize: '0.8rem' }}>
                        {row.type}
                      </Card.Text>
                      <Card.Text style={{ fontSize: '0.8rem' }}>
                        ${formatSize(row.size)}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>

            ))}
        </Row>

        <div className="d-flex justify-content-between">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div>

            <FaStepBackward className="edit-icon mx-2" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />

            <FaStepForward className="edit-icon mx-2" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
          </div>
        </div>
      
    </div>
  );
}

export default FundingTable;
