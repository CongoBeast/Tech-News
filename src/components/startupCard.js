import React from 'react';
// import { useParams  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StartupCard() {

  const location = useLocation();
  const startup = location.state?.startup;

  if (!startup) {
    return <div>Loading...</div>;
  }

  // const { name } = useParams();
  // // Assuming you have a way to fetch the startup details using the name
  // const startups = {
  //   name: 'Dvorak Media',
  //   description: 'Andrey is driven by turning ideas into scalable and empowering experiences that solve real life problems.',
  //   founder: 'Andrey',
  //   previousRole: 'Product Designer at Dropbox',
  //   highlights: [
  //     'Adobe',
  //     'Evernote',
  //     'Square',
  //     'and more'
  //   ],
  //   details: [
  //     { label: 'Startup Name', value: 'Dvorak Media' },
  //     { label: 'Type', value: 'Media' },
  //     { label: 'Size ($)', value: '5M' },
  //     { label: 'Region', value: 'Czech' },
  //     { label: 'Tag', value: 'UI/UX' }
  //   ],
  //   website: 'https://dvorakmedia.com',
  //   careers: 'https://dvorakmedia.com/careers'
  // };

  return (
    <div className="container mt-4">
      <div className="card mb-3" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="path/to/image.jpg" className="card-img" alt="founder" style={{ borderRadius: '15px 0 0 15px', height: '100%' }} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Czech based <br /><strong>UI/UX Designer</strong></h5>
              <p className="card-text">{startup.description}</p>
              <p className="card-text">He is currently the founder of {startup.name}. Previously, {startup.founder} was a {startup.previousRole}.</p>
              <p className="card-text">Over the years, {startup.founder} has been privileged to have worked with {startup.highlights.join(', ')}.</p>
              <ul className="list-group list-group-flush">
                {startup.details.map((detail, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{detail.label}:</strong> {detail.value}
                  </li>
                ))}
              </ul>
              <a href={startup.website} className="btn btn-primary mt-3">Visit Startup Website</a>
              <a href={startup.careers} className="btn btn-secondary mt-3 ml-2">Careers Page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupCard;
