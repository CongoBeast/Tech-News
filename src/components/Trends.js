import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, DropdownButton, Button, Modal, Form } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

function Trends() {
  const [region, setRegion] = useState('Select Region');
  const [genre, setGenre] = useState('Select Genre');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState('Select Month');
  const [week, setWeek] = useState('Select Week');
  const [year, setYear] = useState('Select Year');

  const handleRegionSelect = (region) => setRegion(region);
  const handleGenreSelect = (genre) => setGenre(genre);
  const handleMonthSelect = (month) => setMonth(month);
  const handleWeekSelect = (week) => setWeek(week);
  const handleYearSelect = (year) => setYear(year);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Example data for charts
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Tech Trends',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Tech A', 'Tech B', 'Tech C'],
    datasets: [
      {
        label: 'Tech Distribution',
        data: [300, 50, 100],
        backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)'],
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Growth',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Container fluid>
      <h2 className="my-4">Tech Trends</h2>
      <Row className="mb-4">
        <Col md={4}>
          <DropdownButton id="dropdown-basic-button" title={region} onSelect={handleRegionSelect}>
            <Dropdown.Item eventKey="North America">North America</Dropdown.Item>
            <Dropdown.Item eventKey="Europe">Europe</Dropdown.Item>
            <Dropdown.Item eventKey="Asia">Asia</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={4}>
          <DropdownButton id="dropdown-basic-button" title={genre} onSelect={handleGenreSelect}>
            <Dropdown.Item eventKey="AI">AI</Dropdown.Item>
            <Dropdown.Item eventKey="Blockchain">Blockchain</Dropdown.Item>
            <Dropdown.Item eventKey="IoT">IoT</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={4}>
          {/* <Calendar onChange={setDate} value={date} /> */}
          <Button variant="primary" onClick={handleShowModal}>
            Select Period
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Bar data={barData} options={{ maintainAspectRatio: false }} height={300} />
        </Col>
        <Col md={6} className="mb-4">
          <Pie data={pieData} options={{ maintainAspectRatio: false }} height={300} />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mb-4">
          <Line data={lineData} options={{ maintainAspectRatio: false }} height={300} />
        </Col>
      </Row>
      {/* Placeholder for Map Chart */}
      <Row>
        <Col md={12} className="mb-4">
          <div style={{ height: '300px', backgroundColor: '#f0f0f0', textAlign: 'center', lineHeight: '300px' }}>
            Map Chart Placeholder
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Period</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMonth">
              <Form.Label>Month</Form.Label>
              <DropdownButton id="dropdown-month-button" title={month} onSelect={handleMonthSelect}>
                <Dropdown.Item eventKey="January">January</Dropdown.Item>
                <Dropdown.Item eventKey="February">February</Dropdown.Item>
                <Dropdown.Item eventKey="March">March</Dropdown.Item>
                <Dropdown.Item eventKey="April">April</Dropdown.Item>
                <Dropdown.Item eventKey="May">May</Dropdown.Item>
                <Dropdown.Item eventKey="June">June</Dropdown.Item>
                <Dropdown.Item eventKey="July">July</Dropdown.Item>
                <Dropdown.Item eventKey="August">August</Dropdown.Item>
                <Dropdown.Item eventKey="September">September</Dropdown.Item>
                <Dropdown.Item eventKey="October">October</Dropdown.Item>
                <Dropdown.Item eventKey="November">November</Dropdown.Item>
                <Dropdown.Item eventKey="December">December</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="formWeek">
              <Form.Label>Week</Form.Label>
              <DropdownButton id="dropdown-week-button" title={week} onSelect={handleWeekSelect}>
                <Dropdown.Item eventKey="Week 1">Week 1</Dropdown.Item>
                <Dropdown.Item eventKey="Week 2">Week 2</Dropdown.Item>
                <Dropdown.Item eventKey="Week 3">Week 3</Dropdown.Item>
                <Dropdown.Item eventKey="Week 4">Week 4</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <DropdownButton id="dropdown-year-button" title={year} onSelect={handleYearSelect}>
                <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
                <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
                <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
                <Dropdown.Item eventKey="2024">2024</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Confirm Period
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Trends;
