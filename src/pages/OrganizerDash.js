import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import StatisticsCard from '../components/StatisticsCard';
import Navbar from '../components/Navbar'; // Import the Navbar component
import './OrganizerDash.css';

const OrganizerDash = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    description: '',
    location: ''
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setNewEvent({ name: '', date: '', description: '', location: '' });
    setShowModal(true);
  };

  const handleDeleteEvent = (eventName) => {
    const updatedEvents = events.filter((event) => event.name !== eventName);
    setEvents(updatedEvents);
  };

  return (
    <div className="dashboard-container">
      {/* Include Navbar here */}
      <Navbar />

      <div className="create-event-container">
        <h2>Create New Event</h2>
        <EventForm event={newEvent} onChange={handleChange} onSubmit={handleCreateEvent} />
      </div>

      <div className="statistics-container">
        <StatisticsCard title="Total Events" count={events.length} />
      </div>

      <div className="event-list-container">
        {events.map((event, index) => (
          <EventCard key={index} event={event} onDelete={handleDeleteEvent} />
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Account created successfully!</h3>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDash;
