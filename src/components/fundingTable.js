import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function FundingTable({ rows }) {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/startup/${row._id}`, { state: { startup: row } });
  };

  return (
    <div className="container mt-4">
      <table className="table table-hover" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <thead style={{ backgroundColor: '#000', color: '#fff' }}>
          <tr>
            <th scope="col">Startup Name</th>
            <th scope="col" className="text-right">Type</th>
            <th scope="col" className="text-right">Size ($)</th>
            <th scope="col" className="text-right">Region</th>
            <th scope="col" className="text-right">Tag</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
              <td>{row.startupName}</td>
              <td className="text-right">{row.type}</td>
              <td className="text-right">{row.size}</td>
              <td className="text-right">{row.region}</td>
              <td className="text-right">{row.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FundingTable;
