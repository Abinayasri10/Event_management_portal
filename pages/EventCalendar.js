// client/src/components/EventCalendar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EventCalendar.css';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api';

const CountdownTimer = ({ eventDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Event Started!</span>}
    </div>
  );
};

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/calendar-events`);
      const grouped = {};
      res.data.forEach(event => {
        const eventDate = new Date(event.date).toLocaleDateString();
        if (!grouped[eventDate]) grouped[eventDate] = [];
        grouped[eventDate].push({
          id: event._id,
          name: event.name,
          description: event.description,
          location: event.location,
        });
      });
      setEvents(grouped);
    } catch (err) {
      console.error('Error fetching calendar events:', err);
    }
  };

  const fetchRegisteredEvents = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/event-registers/registrations`);
      setRegisteredEvents(res.data);
    } catch (err) {
      console.error('Error fetching registered events:', err);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddEvent = async () => {
    const dateString = date.toLocaleDateString();

    if (eventName.trim() && eventLocation.trim() && eventDescription.trim()) {
      try {
        const response = await axios.post(`${BACKEND_URL}/calendar-events/create`, {
          name: eventName,
          date: dateString,
          description: eventDescription,
          location: eventLocation,
        });

        const newEvent = {
          id: response.data.event._id,
          name: response.data.event.name,
          description: response.data.event.description,
          location: response.data.event.location,
        };

        setEvents(prev => ({
          ...prev,
          [dateString]: [...(prev[dateString] || []), newEvent],
        }));

        setEventName('');
        setEventLocation('');
        setEventDescription('');
      } catch (err) {
        console.error('Error adding calendar event:', err);
      }
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;

    try {
      const response = await axios.put(`${BACKEND_URL}/calendar-events/update/${editingEvent.id}`, {
        name: eventName,
        description: eventDescription,
        location: eventLocation,
      });

      const updatedEvent = response.data.event;
      const dateString = date.toLocaleDateString();

      setEvents(prev => ({
        ...prev,
        [dateString]: prev[dateString].map(event =>
          event.id === updatedEvent._id ? updatedEvent : event
        ),
      }));

      setEventName('');
      setEventLocation('');
      setEventDescription('');
      setEditingEvent(null);
    } catch (err) {
      console.error('Error updating calendar event:', err);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${BACKEND_URL}/calendar-events/delete/${eventId}`);
      const dateString = date.toLocaleDateString();

      setEvents(prev => ({
        ...prev,
        [dateString]: prev[dateString].filter(event => event.id !== eventId),
      }));
    } catch (err) {
      console.error('Error deleting calendar event:', err);
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setEventName(event.name);
    setEventLocation(event.location);
    setEventDescription(event.description);
  };

  return (
    <div className="eventcalendar-container">
      {/* Navbar */}
      <nav>
        <h2><b>Event Management Portal</b></h2>
        <ul>
          <li><Link to="/" className={window.location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/eventcalendar">Events Calendar</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Calendar */}
      <div className="calendar-section">
        <Calendar onChange={handleDateChange} value={date} />
        <h3>Selected Date: {date.toLocaleDateString()}</h3>

        <div className="event-input">
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Event name"
          />
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            placeholder="Location"
          />
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Description"
          />
          {editingEvent ? (
            <button onClick={handleUpdateEvent}>Update Event</button>
          ) : (
            <button onClick={handleAddEvent}>Add Event</button>
          )}
        </div>

        <div className="events-list">
          {events[date.toLocaleDateString()] && events[date.toLocaleDateString()].length > 0 ? (
            <ul>
              {events[date.toLocaleDateString()].map((event) => (
                <li key={event.id}>
                  <strong>{event.name}</strong> @ {event.location}<br />
                  {event.description}
                  <div>
                    <button className="edit-event-btn" onClick={() => handleEditClick(event)}>Edit</button>
                    <button className="delete-event-btn" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for this date.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default EventCalendar;
