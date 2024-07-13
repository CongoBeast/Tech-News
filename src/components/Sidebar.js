import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";
import { FaNewspaper } from "react-icons/fa6";
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isLinkActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="flex-column d-none d-lg-block sidebar"
    >
      <Navbar.Brand as={Link} to="/">
        <img src="https://github.com/CongoBeast/Tech-News/blob/master/src/components/tech-week.png?raw=true" 
        alt="Imat Tech Logo"
          style={{ maxHeight: "100px", maxWidth: "100px", marginBottom: "10px" }}
          className="d-flex align-items-center"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />

      <Navbar.Collapse id="basic-navbar-nav" className={!isOpen && "d-none d-lg-block"}>
        <Nav className="flex-column gap-4" style={{ padding: "2rem", textAlign: "right" }}>
          <Button
            as={Link}
            to="/home"
            variant={isLinkActive("/home") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <FaHome />
            <span style={{ marginLeft: "1rem" }}>Home</span>
          </Button>


          <Button
            as={Link}
            to="/funding"
            variant={isLinkActive("/funding") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <FaNewspaper />
            <span style={{ marginLeft: "1rem" }}>Funding News</span>
          </Button>

          <Button
            as={Link}
            to="/trends"
            variant={isLinkActive("/trends") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <BsFillFileBarGraphFill />
            <span style={{ marginLeft: "1rem" }}>Trends</span>
          </Button>

          <Button
            as={Link}
            to="/about"
            variant={isLinkActive("/about") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <IoIosInformationCircle />
            <span style={{ marginLeft: "1rem" }}>About Us</span>
          </Button>

          <Button
            as={Link}
            to="/admin"
            variant={isLinkActive("/admin") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <IoIosInformationCircle />
            <span style={{ marginLeft: "1rem" }}>Admin</span>
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
