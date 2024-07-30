import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Assuming you have your custom CSS in App.css

const techGenres = [
  { name: 'AI', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/AI.jfif' },
  { name: 'BlockChain', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/blockchain.jfif' },
  { name: 'Security', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/cyber.jfif' },
  { name: 'Aerospace', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/aerospace.jfif' },
  { name: 'Climate', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/energy.jfif' },
  { name: 'Energy', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/energy.jfif' },
  { name: 'Military', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/defense.jfif' },
  { name: 'MotorVehicles', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/evs.jfif' },
  { name: 'FinTech', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/fintech.jfif' },
  { name: 'BioTech', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/biotech.jfif' },
  { name: 'Agric', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/agric-tech.jfif' },
  { name: 'Logistics', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/logistics.jfif' },
  { name: 'Ecommerce', image: 'https://raw.githubusercontent.com/CongoBeast/personal-site/master/src/ecommerce.jfif' }
];

function ninefigure() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">9 Figure Club</h1>
      <div className="row">
        {techGenres.map((genre, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
              <img src={genre.image} className="card-img-top" alt={genre.name} />
              <div className="card-body text-center" style={{ backgroundColor: '#6A0DAD', color: 'white' }}>
                <h5 className="card-title">{genre.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ninefigure;
