import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="navbar-title">Organizer Dashboard</h1>
      <div className="navbar-links">
        <Link to="/organizer" className="navbar-link">Dashboard</Link>
        <Link to="/organizer/create-event" className="navbar-link">Create Event</Link>
        <Link to="/organizer/view-events" className="navbar-link">View Events</Link>
        <Link to="/logout" className="navbar-link">Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;
