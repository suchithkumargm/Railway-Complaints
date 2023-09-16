import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
  const navLinkStyle = {
    fontSize: '25px', // Adjust the font size as needed
  };

  return (
    <Nav className="justify-content-center" activeKey="/home">
      <Nav.Item>
        <Link to="/" className="nav-link" style={navLinkStyle}>
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/login" className="nav-link" style={navLinkStyle}>
          Login
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/register" className="nav-link" style={navLinkStyle}>
          Register
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/complaints" className="nav-link" style={navLinkStyle}>
          Complaints
        </Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
