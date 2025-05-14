import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Navbar.css'; // You can still keep custom styling if needed

const OrganizerNavbar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="navbar">
  <Navbar.Brand className="navbar-title ms-3">Organizer Dashboard</Navbar.Brand>
  <Navbar.Toggle aria-controls="organizer-navbar-nav" />
  <Navbar.Collapse id="organizer-navbar-nav">
    <Nav className="ms-auto me-3 navbar-links">
      <Nav.Link as={Link} to="/organizer" className="navbar-link">Dashboard</Nav.Link>
      <Nav.Link as={Link} to="/organizer/create-event" className="navbar-link">Create Event</Nav.Link>
      <Nav.Link as={Link} to="/register" className="navbar-link">View Events</Nav.Link>
      <Nav.Link as={Link} to="/logout" className="navbar-link">Logout</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
};

export default OrganizerNavbar;
