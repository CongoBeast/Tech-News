import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="month"
            placeholder="Month"
            value={filters.month}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="tag"
            placeholder="Tag"
            value={filters.tag}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={filters.region}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={filters.size}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={filters.type}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
      </div>
      <table className="table table-hover" style={{ borderRadius: '15px', overflow: 'hidden' }}>
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
          {filteredRows.map((row) => (
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
    </div>
  );
}

export default FundingTable;
