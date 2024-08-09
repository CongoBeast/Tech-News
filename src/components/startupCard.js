import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdBriefcase , IoMdGlobe } from "react-icons/io";
import { Stack, Badge } from 'react-bootstrap';

function StartupCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const startup = location.state?.startup;

  const [similarStartups, setSimilarStartups] = React.useState([]);

  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  React.useEffect(() => {
    if (startup) {
      const savedData = JSON.parse(localStorage.getItem('fundingData')) || [];
      const filteredStartups = savedData.filter(item =>
        item.region === startup.region &&
        item.type === startup.type &&
        item.tag === startup.tag &&
        item._id !== startup._id
      ).slice(0, 3); // Get 3 similar companies

      setSimilarStartups(filteredStartups);
    }
  }, [startup]);

  const handleCardClick = (similarStartup) => {
    navigate(`/startup/${similarStartup._id}`, { state: { startup: similarStartup } });
  };

  console.log(startup)

  if (!startup) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card mb-3" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={startup.imageLink} className="card-img aspect-ratio" alt="founder" style={{ borderRadius: '15px 0 0 15px', height: '100%' }} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title"><strong>{startup.startupName}</strong></h5>
              <p className="card-text" style={{ fontSize: '0.8rem' }}>{startup.description}</p>
              <p className="card-text" style={{ fontSize: '0.7rem' }}><strong>Region: </strong>{startup.region}</p>
              {startup.country && <p className="card-text" style={{ fontSize: '0.7rem' }}><strong>Country: </strong>{startup.country}</p>}
              {startup.founders && <p className="card-text" style={{ fontSize: '0.7rem' }}><strong>Founders: </strong>{startup.founders}</p>}
              {startup.backers && <p className="card-text" style={{ fontSize: '0.7rem' }}><strong>Backers: </strong>{startup.backers}</p>}
              <p className="card-text" style={{ fontSize: '0.7rem' }}><strong>Stage: </strong>{startup.type}</p>
              <p className="card-text" style={{ fontSize: '0.7rem' }}><strong>Tag: </strong>{startup.tag}</p>

              {/* {startup.keyWords && <p>{startup.keyWords}</p>} */}

              

              <a href={startup.siteLink} className='mx-3' style={{ textDecoration: 'none', color: 'inherit' }}>
                <IoMdGlobe style={{ marginRight: '5px' }}/>
                <span>Company Site</span>
              </a>

              <a href={startup.careersLink} className='mx-3' style={{ textDecoration: 'none', color: 'inherit' }}>
                <IoMdBriefcase style={{ marginRight: '5px' }} />
                <span>Work here!</span>
              </a>

              {startup.keyWords && <Stack direction="horizontal" gap={2} className='mt-2'>
                {startup.keyWords.map((keyword, index) => (
                  <Badge key={index} pill bg={getRandomColor()} text={keyword === 'light' ? 'dark' : ''}>
                    {keyword}
                  </Badge>
                ))}
              </Stack>}
              
            </div>
          </div>
        </div>
      </div>

      <h5>Similar Startups</h5>
      <div className="row">
        {similarStartups.map(similarStartup => (
          <div className="col-md-4" key={similarStartup._id}>
            <div className="card mb-3" onClick={() => handleCardClick(similarStartup)} style={{ cursor: 'pointer' }}>
              <img src={similarStartup.imageLink} className="card-img-top" alt={similarStartup.startupName} />
              <div className="card-body">
                <h5 className="card-title">{similarStartup.startupName}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartupCard;
