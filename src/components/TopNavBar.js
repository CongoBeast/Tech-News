import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation , useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


import { RxDashboard, RxPinLeft } from "react-icons/rx";
import { GiTruck } from "react-icons/gi";
import { IoPieChartSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { GiCoalWagon } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { SiMicrosoftexcel } from "react-icons/si";
import { RiAlarmWarningFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";
import { FaNewspaper } from "react-icons/fa6";


function TopNavBar() {

  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // Check login status on location change

  const isLinkActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Remove token from local storage and update state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/home'); // Redirect to home after logout
  };

  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary d-lg-none mb-3 mx p-1">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Brand as={Link} to="/">
        <img src="https://github.com/CongoBeast/Tech-News/blob/master/src/components/tech-week.png?raw=true" 
        alt="Imat Tech Logo"
          style={{ maxHeight: "50px", maxWidth: "50px" }}
          className="d-flex align-items-center"
        />
      </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
    
          <Nav className='ml-auto' style={{textAlign: "right"}}>


          <Nav.Link    as={Link}
              to="/home"
              variant={isLinkActive("/home") ? "primary" : "outline-light"}
              className="text-left d-flex align-items-center"
              style={{ marginBottom: "1rem" }}>
        
              <FaHome />
              <span style={{ marginLeft: "1rem" }}>Home</span>
          </Nav.Link>

          <Nav.Link as={Link}
            to="/funding"
            variant={isLinkActive("/funding") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}>
            <FaNewspaper />
            <span style={{ marginLeft: "1rem" }}>Funding News</span>
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/trends"
            variant={isLinkActive("/trends") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <BsFillFileBarGraphFill />
            <span style={{ marginLeft: "1rem" }}>Trends</span>
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/about"
            variant={isLinkActive("/about") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <IoIosInformationCircle />
            <span style={{ marginLeft: "1rem" }}>About Us</span>
          </Nav.Link>

          {isLoggedIn && (
            <>
              <Nav.Link
                as={Link}
                to="/admin"
                variant={isLinkActive("/admin") ? "primary" : "outline-light"}
                className="text-left d-flex align-items-center"
                style={{ marginBottom: "1rem" }}
              >
                <IoIosInformationCircle />
                <span style={{ marginLeft: "1rem" }}>Admin</span>
              </Nav.Link>
              <Nav.Link
                onClick={handleLogout}
                variant="outline-light"
                className="text-left d-flex align-items-center"
                style={{ marginBottom: "1rem" }}
              >
                <span style={{ marginLeft: "1rem" }}>Logout</span>
              </Nav.Link>
            </>
          )}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavBar;