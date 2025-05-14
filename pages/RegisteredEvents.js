import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RegisteredEvents.css';

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get('/api/registered-events');
        setRegisteredEvents(response.data);
      } catch (err) {
        console.error('Error fetching registered events:', err);
        setError('Failed to fetch registered events.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading registered events...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="registered-events-container">
      <nav>
              <h2 className='hc'><b>Event Management Portal</b></h2>
              <ul>
                
              </ul>
            </nav>
      {registeredEvents.length === 0 ? (
        <div className="no-events-message">No registered events found.</div>
      ) : (
        registeredEvents.map((event) => (
          <div className="e-card" key={event._id}>
            <div className="e-card-header">
              <h3>{event.eventName}</h3>
            </div>
            
            <div className="e-card-body">
              <div className="event-date">
                <span className="icon">📅</span>
                <span>{new Date(event.eventStartTime).toLocaleDateString('en-IN')}</span>
              </div>
              
              <div className="event-detail">
                <span className="icon">👤</span>
                <span><strong>Registered by:</strong> {event.firstName} {event.lastName}</span>
              </div>
              
              <div className="event-detail">
                <span className="icon">✉️</span>
                <span><strong>Email:</strong> {event.email}</span>
              </div>
              
              <div className="event-detail">
                <span className="icon">📞</span>
                <span><strong>Phone:</strong> {event.phone}</span>
              </div>
              
              <div className="event-detail">
                <span className="icon">🎟️</span>
                <span><strong>Ticket Type:</strong> {event.ticketType}</span>
              </div>
              
              <div className="event-detail quantity">
                <span className="circle-number">{event.quantity}</span>
                <span><strong>Tickets</strong></span>
              </div>
            </div>
            
            <div className="e-card-footer">
              <div className="payment-details">
                <div className="price-tag">
                  <span className="icon">₹</span>
                  <span>{event.totalPrice}</span>
                </div>
                
                <div className="payment-method">
                  <span className="icon">💳</span>
                  <span>{event.paymentMethod}</span>
                </div>
              </div>
              
              {event.specialRequirements && (
                <div className="special-requirements">
                  <span className="icon">📋</span>
                  <p>{event.specialRequirements}</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RegisteredEvents;