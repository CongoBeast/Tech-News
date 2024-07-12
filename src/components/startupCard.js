import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StartupCard() {
  const location = useLocation();
  const startup = location.state?.startup;

  console.log(startup)

  if (!startup) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card mb-3" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={startup.imageLink} className="card-img" alt="founder" style={{ borderRadius: '15px 0 0 15px', height: '100%' }} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title"><strong>{startup.startupName} </strong> </h5>
              <p className="card-text">{startup.description}</p>
              <p className="card-text"><strong>Region: </strong> {startup.region}</p>
              <p className="card-text"><strong>Stage: </strong> {startup.type}</p>
              <p className="card-text"><strong>Tag: </strong> {startup.tag}</p>
              <a href={startup.siteLink} className="btn btn-primary mt-3 ml-2">Visit Startup Website</a>
              <a href={startup.careersLink} className="btn btn-secondary mt-3 ml-2">Careers Page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupCard;
