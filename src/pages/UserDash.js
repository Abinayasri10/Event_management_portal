import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDash.css'; 

const EventManagementPortal = () => {
  return (
    <>
      <nav style={{ color: 'rgb(50, 48, 48)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#CAF0F8' }}>
        <h2><b>Event Management Portal</b></h2>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', fontFamily: 'Charm', fontWeight: '900', fontSize: 'larger' }}>
          <li>Home</li>
          <li><a href="/event_creation" style={{ textDecoration: 'none' }}>Event Creation</a></li>
          <li><a href="eventcalendar.html" style={{ textDecoration: 'none' }}>Events Calendar</a></li>
          <li><a href="/events" style={{ textDecoration: 'none' }}>Events</a></li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="text" className="search-bar" placeholder="Search..." />
          <button className="get-tickets">Get Tickets</button>
        </div>
      </nav>

      <div className="header">
        <h1>Creative Business Agency Conference 2019</h1>
        <p>January 24, 2019 | New York, USA</p>
        <button className="get-tickets">Register Now</button>
      </div>

      <div className="event-highlight">
        <div className="text">
          <h2>Exciting Event Experience</h2>
          <p>Join us for an immersive experience featuring industry leaders, networking opportunities, and insightful discussions. Get ready for an unforgettable event!</p>
          <button className="get-tickets">Learn More</button>
        </div>
        <div className="video">
          <img src="https://i.gifer.com/AYec.gif" alt="Event Video" />
          <i className="fas fa-play play-btn"></i>
        </div>
      </div>

      <div className="event-highlight reverse">
        <div className="text">
          <h2>Ignite Your Entrepreneurial Spirit</h2>
          <p>Gain insights from successful founders, discover new opportunities, and build connections that shape your startup journey.</p>
          <button className="get-tickets">Learn More</button>
        </div>
        <div className="video">
          <img src="https://www.twilio.com/content/dam/twilio-com/global/en/blog/legacy/2018/gif-ready-signalconf/Animated_GIF-downsized_large-4.gif" alt="Event Video" />
          <i className="fas fa-play play-btn"></i>
        </div>
      </div>

      <div className="event-showcase">
        <div className="text-content">
          <h2>Experience the Ultimate Industry Event</h2>
          <p>Get ready to be part of an unforgettable event that brings together visionaries, industry leaders, and innovative minds from across the globe. Whether you're looking to expand your knowledge, network with like-minded professionals, or gain insights from expert speakers, this event is designed to inspire and empower you.</p>

          <h3>What to Expect?</h3>
          <ul>
            <li><strong>Inspiring Keynote Sessions</strong> – Hear from renowned speakers who are shaping the future of technology, business, and creativity.</li>
            <li><strong>Networking Opportunities</strong> – Connect with industry experts, entrepreneurs, and peers.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventManagementPortal;
