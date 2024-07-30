import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

function FundingAnalysis() {
  const [fundingData, setFundingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
  const [regionBarData, setRegionBarData] = useState({});
  const [topFunding, setTopFunding] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterCount , setFilterCount]= useState(0)

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [region, setRegion] = useState('');
  const [tag, setTag] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    fetchFundingData();
  }, []);

  useEffect(() => {
    filterData();
  }, [year, month, region, tag, type, fundingData]);

  const fetchFundingData = async () => {
    try {
      const response = await axios.get('https://tech-news-backend.onrender.com/funding-news');
      const data = response.data;
      setFundingData(data);
      processFundingData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching funding data:', error);
      setLoading(false);
    }
  };

  const filterData = () => {
    let filtered = fundingData;
    if (year) filtered = filtered.filter(item => item.year === year);
    if (month) filtered = filtered.filter(item => item.month === month);
    if (region) filtered = filtered.filter(item => item.region === region);
    if (tag) filtered = filtered.filter(item => item.tag === tag);
    if (type) filtered = filtered.filter(item => item.type === type);
    setFilterCount(filtered.length)
    setFilteredData(filtered);
    processFundingData(filtered);
  };

  const processFundingData = (data) => {
    const tags = ['AI', 'Blockchain', 'IoT', 'Aerospace', 'Climate', 'Energy', 'Security', 'Military', 'MotorVehicles', 'BioTech', 'Agric' , 'FinTech'];
    const continents = ['america', 'europe', 'asia', 'africa', 'middleeast'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const types = ['Series A', 'Series B', 'Series C' , 'Series D' ,  'Pre-Seed', 'Seed', 'Pre-Series A' , 'Other'];

    const tagSummaries = tags.map(tag => {
      const articlesWithTag = data.filter(article => article.tag === tag);
      const totalSize = articlesWithTag.reduce((sum, article) => sum + (parseInt(article.size, 10) || 0), 0);
      return totalSize;
    });

    const regionSummaries = continents.map(region => {
      const articlesWithTag = data.filter(article => article.region === region);
      const totalSize = articlesWithTag.reduce((sum, article) => sum + (parseInt(article.size, 10) || 0), 0);
      return totalSize;
    });

    const monthSummaries = months.map(month => {
      const articlesWithTag = data.filter(article => article.month === month);
      const totalSize = articlesWithTag.reduce((sum, article) => sum + (parseInt(article.size, 10) || 0), 0);
      return totalSize;
    });

    const typeSummaries = types.map(type => {
      const articlesWithTag = data.filter(article => article.type === type);
      const totalSize = articlesWithTag.reduce((sum, article) => sum + (parseInt(article.size, 10) || 0), 0);
      return totalSize;
    });

    const lineChartData = {
      labels: tags,
      datasets: [
        {
          label: 'Funding by Tag',
          data: tagSummaries,
          backgroundColor: 'rgba(75,192,192,0.1)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    const barChartData = {
      labels: months,
      datasets: [
        {
          label: 'Funding Raised Each Month (USD)',
          data: monthSummaries,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    const doughnutChartData = {
      labels: types,
      datasets: [
        {
          label: 'Funding Type Distribution',
          data: typeSummaries,
          backgroundColor: [
            '#2e092d',
            '#2A265F',
            '#8BC1F7',
            '#5752D1',
            'rgba(153,102,255,0.6)',
          ],
        },
      ],
    };

    const doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 50, // Adjust the thickness of the donut
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}`;
            },
          },
        },
      },
    };

    const regionBarChartData = {
      labels: continents,
      datasets: [
        {
          label: 'Funding by Region',
          data: regionSummaries,
          backgroundColor:  [
            '#2e092d',
            '#2A265F',
            '#8BC1F7',
            '#5752D1',
            'rgba(153,102,255,0.6)',
          ],
          // borderColor: 'rgba(153,102,255,1)',
          borderWidth: 1,
        },
      ],
    };

    const topFundingMetrics = {
      highestFunding: Math.max(...tagSummaries),
      topContinent: continents[regionSummaries.indexOf(Math.max(...regionSummaries))],
      topTag: tags[tagSummaries.indexOf(Math.max(...tagSummaries))],
      topType: types[typeSummaries.indexOf(Math.max(...typeSummaries))],
    };

    // console.log(type)

    setLineData(lineChartData);
    setBarData(barChartData);
    setDoughnutData(doughnutChartData);
    setRegionBarData(regionBarChartData);
    setTopFunding(topFundingMetrics);
  };

  const formatMillions = value => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    return `$${(value / 1e6).toFixed(1)}M`;
  };

  return (
    <Container fluid>
      <h2 className="my-4">Funding Analysis</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Row className="mb-4 justify-content-center">
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">{year || 'Year'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setYear('2021')}>2021</Dropdown.Item>
                  <Dropdown.Item onClick={() => setYear('2022')}>2022</Dropdown.Item>
                  <Dropdown.Item onClick={() => setYear('2023')}>2023</Dropdown.Item>
                  <Dropdown.Item onClick={() => setYear('2024')}>2024</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">{month || 'Month'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <Dropdown.Item key={month} onClick={() => setMonth(month)}>{month}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">{region || 'Region'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {['america', 'europe', 'asia', 'africa', 'middleeast'].map(region => (
                    <Dropdown.Item key={region} onClick={() => setRegion(region)}>{region}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">{tag || 'Tag'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {['AI', 'Blockchain', 'IoT', 'Aerospace', 'Climate', 'Energy', 'Security', 'Military', 'MotorVehicles', 'BioTech', 'Agric'].map(tag => (
                    <Dropdown.Item key={tag} onClick={() => setTag(tag)}>{tag}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">{type || 'Type'}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {['Series A', 'Series B', 'Pre-Seed', 'Seed', 'Pre-Series A' , 'Other'].map(type => (
                    <Dropdown.Item key={type} onClick={() => setType(type)}>{type}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row className='justify-content-center'>
            <Col md={2} className="mb-4">
              <Card style={{ background: 'linear-gradient(to right, #2f2f33, #2575fc)', color: 'white' }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: '1.8rem' }}>{formatMillions(topFunding.highestFunding)}</Card.Title>
                  <Card.Text style={{ fontSize: '0.8rem' }}>Highest Funding </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="mb-4">
              <Card style={{ background: 'linear-gradient(to right, #2575fc, #420f41', color: 'white' }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: '1.8rem' }}>{topFunding.topContinent}</Card.Title>
                  <Card.Text style={{ fontSize: '0.8rem' }}>Top Continent </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="mb-4">
              <Card style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', color: 'white' }}>
                <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem' }}>{topFunding.topTag}</Card.Title>
                  <Card.Text style={{ fontSize: '0.8rem' }}>Top Tag</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="mb-4">
              <Card style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', color: 'white' }}>
                <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem' }}>{topFunding.topType}</Card.Title>
                  <Card.Text style={{ fontSize: '0.8rem' }}>Top Type</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className="mb-4">
              <Card style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', color: 'white' }}>
                <Card.Body>
                <Card.Title style={{ fontSize: '1.8rem' }}>{filterCount}</Card.Title>
                  <Card.Text style={{ fontSize: '0.8rem' }}>No. Companies</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>


          <Row>
            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Funding by Tag</Card.Title>
                  <Bar data={lineData}
                  options={{
                    scales: {
                      y: {
                        ticks: {
                          callback: (value) => formatMillions(value),
                        },
                        grid: {
                          display: false, // Remove grid lines
                        },
                      },
                      x: {
                        grid: {
                          display: false, // Remove grid lines
                        },
                      }
                    },
                  }} />
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Funding Raised Each Month (USD)</Card.Title>
                  <Bar data={barData}
                  options={{
                    scales: {
                      y: {
                        ticks: {
                          callback: (value) => formatMillions(value),
                        },
                        grid: {
                          display: false, // Remove grid lines
                        },
                      },
                      x: {
                        grid: {
                          display: false, // Remove grid lines
                        },
                      }
                    },
                  }}
                  
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-4" >
              {/* <Card style={{ height: '200px' }}> */}
              <Card>
                <Card.Body>
                  <Card.Title>Funding Type Distribution</Card.Title>
                  <Doughnut data={doughnutData} 
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Funding by Region</Card.Title>
                  <Bar data={regionBarData} 
                  options={{
                    scales: {
                      y: {
                        ticks: {
                          callback: (value) => formatMillions(value),
                        },
                        grid: {
                          display: false, // Remove grid lines
                        },
                      },
                      x: {
                        grid: {
                          display: false, // Remove grid lines
                        },
                      }
                    },
                  }}
                  
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
        </>
      )}
    </Container>
  );
}

export default FundingAnalysis;