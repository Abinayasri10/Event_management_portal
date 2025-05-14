import React from 'react';
import './Home.css';  
import './UserDash.css'; 
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
              <nav>
                <h2><b>Event Management Portal</b></h2>
                <ul>
                  <li><Link to="/home" className={window.location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                  <li><Link to="/eventregister">Event Register</Link></li>
                  <li><Link to="/eventcalendar">Events Calendar</Link></li>
                  <li><Link to="/events">Events</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </nav>
      <header className="hero-section">
        <h1>Welcome to the Event Management Portal</h1>
        <p>Your one-stop platform for organizing and booking events.</p>
        
      </header>

      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="event-display">
          <div className="event-show">
            <img src="https://tavitsphotography.com/wp-content/uploads/2023/07/JNF-114-2-1080x721.jpg" alt="Event 1" />
            <h3>Music Festival</h3>
            <p>Join us for a weekend of live music, food, and fun!</p>
          </div>
          <div className="event-show">
            <img src="https://thumbs.dreamstime.com/b/business-speaker-giving-talk-conference-hall-event-audience-entrepreneurship-concept-76866426.jpg" alt="Event 2" />
            <h3>Tech Conference</h3>
            <p>Learn about the latest trends in tech and innovation.</p>
          </div>
          <div className="event-show">
            <img src="https://agcdn-1d97e.kxcdn.com/wp-content/uploads/2021/07/alphagamma-tech-conferences-you-cannot-miss-entrepreneurship-2021-1021x580.jpg" alt="Event 3" />
            <h3>Art Exhibition</h3>
            <p>Explore a wide variety of art from local artists.</p>
          </div>
          <div className="event-show">
            <img src="https://thumbs.dreamstime.com/b/business-speaker-giving-talk-conference-hall-event-audience-entrepreneurship-concept-76866426.jpg" alt="Event 2" />
            <h3>Tech Conference</h3>
            <p>Learn about the latest trends in tech and innovation.</p>
          </div>
        </div>
      </section>

      <section className="about-us">
        <h2>About Us</h2>
        <p>We provide an easy-to-use platform for both event organizers and attendees. Whether you're hosting a conference, festival, or a local gathering, we’ve got you covered!</p>
      </section>
    </div>
  );
}

export default Home;
