import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";
import { FaNewspaper } from "react-icons/fa6";
import './Sidebar.css';

function Sidebar() {
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove token from local storage and update state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/home'); // Redirect to home after logout
    toggleSidebar(); // Close the sidebar after logout
  };

  const handleNavClick = (path) => {
    navigate(path);
    toggleSidebar(); // Close the sidebar when a navigation item is clicked
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="flex-column d-none d-lg-block sidebar"
    >
      <Navbar.Brand as={Link} to="/">
        <img src="https://github.com/CongoBeast/Tech-News/blob/master/public/cordelia-side-nav.png?raw=true" 
        alt="Imat Tech Logo"
          style={{  width: "160px" , height: "80px" }}
          className="d-flex align-items-center"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />

      <Navbar.Collapse id="basic-navbar-nav" className={!isOpen && "d-none d-lg-block"}>
        <Nav className="flex-column gap-3" style={{ padding: "2rem", textAlign: "right" }}>
          <Button
            variant={isLinkActive("/home") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
            onClick={() => handleNavClick('/home')}
          >
            <FaHome />
            <span style={{ marginLeft: "1rem" }}>Home</span>
          </Button>

          <Button
            variant={isLinkActive("/funding") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
            onClick={() => handleNavClick('/funding')}
          >
            <FaNewspaper />
            <span style={{ marginLeft: "1rem" }}>Funding News</span>
          </Button>

          <Button
            variant={isLinkActive("/trends") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
            onClick={() => handleNavClick('/trends')}
          >
            <BsFillFileBarGraphFill />
            <span style={{ marginLeft: "1rem" }}>Trends</span>
          </Button>

          <Button
            variant={isLinkActive("/about") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
            onClick={() => handleNavClick('/about')}
          >
            <IoIosInformationCircle />
            <span style={{ marginLeft: "1rem" }}>About Us</span>
          </Button>

          {isLoggedIn && (
            <>
              <Button
                variant={isLinkActive("/admin") ? "primary" : "outline-light"}
                className="text-left d-flex align-items-center"
                style={{ marginBottom: "1rem" }}
                onClick={() => handleNavClick('/admin')}
              >
                <IoIosInformationCircle />
                <span style={{ marginLeft: "1rem" }}>Admin</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline-light"
                className="text-left d-flex align-items-center"
                style={{ marginBottom: "1rem" }}
              >
                <span style={{ marginLeft: "1rem" }}>Logout</span>
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
