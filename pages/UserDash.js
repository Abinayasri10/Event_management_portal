import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDash.css'; 
import { Link, useNavigate } from 'react-router-dom';

export default function UserDash() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await axios.get('http://localhost:5000/api/events');
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventClick = (eventId) => {
    navigate(`/eventregister/${eventId}`);
  };

  // Function to format date for the event cards
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' })
    };
  };

  // Function to determine if an event should be featured (example: newest events)
  const isEventFeatured = (event) => {
    // Logic to determine featured events (e.g., newest events, special events, etc.)
    const eventDate = new Date(event.date);
    const now = new Date();
    const daysDifference = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
    
    // Example: Events happening within the next 7 days are featured
    return daysDifference > 0 && daysDifference <= 7;
  };

  if (loading) {
    return <div className="text-center">Loading events...</div>;
  }

  // Get top 3 upcoming events for featured section
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter(event => new Date(event.date) >= new Date())
    .slice(0, 3);

  return (
    <div className="userdash-container">
      {/* Navbar */}
      <nav>
        <h2><b>Event Management Portal</b></h2>
        <ul>
          <li><Link to="/home" className={window.location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/eventregister">Event Register</Link></li>
          <li><Link to="/eventcalendar">Events Calendar</Link></li>
          <li><Link to="/register">Events</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Link to="/ticketbooking">
  <button className="get-tickets">Get Tickets</button>
</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="header">
        <div className="hero-content">
          <h1 className='hu'>Discover Upcoming Events</h1>
          <p className='hu'>Explore workshops, conferences, meetups and more happening near you!</p>
          <button className="get-tickets">Explore Now</button>
        </div>
      </header>

      

      {/* Events Listing */}
      <section className="events-section container my-5">
        <h2 className="mb-4">Available Events</h2>
        <div className="row">
          {filteredEvents.length === 0 ? (
            <p>No events match your search. Try a different keyword.</p>
          ) : (
            filteredEvents.map(ev => {
              const formattedDate = formatEventDate(ev.date);
              const isFeatured = isEventFeatured(ev);
              
              return (
                <div
                  className="col-md-4 mb-4"
                  key={ev._id}
                  onClick={() => handleEventClick(ev._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`card h-100 event-card ${isFeatured ? 'featured' : ''}`}>
                    {/* Event image container */}
                    <div className="event-card-img">
                      {/* Placeholder image - replace with actual image from your API */}
                      <img src={ev.imageUrl || 'https://img.freepik.com/free-photo/technology-innovation-digital-evolution-homepage-concept_53876-165281.jpg'} alt={ev.name} />
                      
                      {/* Date badge */}
                      <div className="event-date">
                        <div className="month">{formattedDate.month}</div>
                        <div className="day">{formattedDate.day}</div>
                      </div>
                      
                      {/* Availability badge - optional, based on your data */}
                      {ev.availability && (
                        <div className={`event-availability ${ev.availability.toLowerCase()}`}>
                          {ev.availability}
                        </div>
                      )}
                    </div>

                    <div className="card-body">
                      {/* Event category - if available in your data */}
                      <span className="event-category">
                        {ev.category || 'Event'}
                      </span>
                      
                      {/* Event title */}
                      <h5 className="card-title">{ev.name}</h5>
                      
                      {/* Event description */}
                      <p className="card-text">{ev.description}</p>
                      
                      {/* Event location */}
                      <div className="event-location">{ev.location}</div>
                      
                      {/* Event tags - if available in your data */}
                      {ev.tags && ev.tags.length > 0 && (
                        <div className="event-tags">
                          {ev.tags.map((tag, index) => (
                            <span key={index} className="event-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      
                      {/* Event details footer */}
                      <div className="event-details">
                        <div className="event-time">
                          {ev.time || new Date(ev.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <button className="register-btn" onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(ev._id);
                        }}>
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Find events that match your interests</p>
          </div>
          <div className="categories-grid">
            {['Conferences', 'Workshops', 'Networking', 'Music', 'Tech', 'Business'].map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">
                  {/* Replace with actual icons */}
                  {category === 'Conferences' && '🎤'}
                  {category === 'Workshops' && '🛠️'}
                  {category === 'Networking' && '🤝'}
                  {category === 'Music' && '🎵'}
                  {category === 'Tech' && '💻'}
                  {category === 'Business' && '💼'}
                </div>
                <h3>{category}</h3>
                <p>Explore {category.toLowerCase()} events</p>
                <Link to={`/discover`} className="category-link">
                  Discover →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple steps to attend any event</p>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3>Browse Events</h3>
              <p>Explore our diverse range of events and find what interests you</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-icon">🎟️</div>
              <h3>Register</h3>
              <p>Secure your spot by registering for the event</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-icon">📧</div>
              <h3>Get Confirmation</h3>
              <p>Receive confirmation and important details via email</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-icon">🎉</div>
              <h3>Attend Event</h3>
              <p>Attend and enjoy the event experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What People Say</h2>
            <p>Testimonials from event attendees</p>
          </div>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">The conference was extremely well-organized and the speakers were incredible. I learned so much and made valuable connections.</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {/* Replace with actual avatar */}
                  <img src="https://thumbs.dreamstime.com/b/portrait-happy-ambitious-indian-top-manager-modern-office-businessman-proud-career-achievement-smiling-young-man-339154938.jpg" alt="Sarah J." />
                </div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Tech Conference 2024</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">The workshop exceeded my expectations. The practical exercises really helped me understand the concepts better.</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {/* Replace with actual avatar */}
                  <img src="https://media.istockphoto.com/id/1135381120/photo/portrait-of-a-young-woman-outdoors-smiling.jpg?s=612x612&w=0&k=20&c=T5dukPD1r-o0BFqeqlIap7xzw07icucetwKaEC2Ms5M=" alt="Michael T." />
                </div>
                <div className="author-info">
                  <h4>Michael Thomas</h4>
                  <p>Design Workshop</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">This was my third time attending this annual event and it gets better every year. The networking opportunities are invaluable.</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {/* Replace with actual avatar */}
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTScXx7ADkpcuKnsj-crOOPQ26QLyzCaA4ppHRmO1Tkpd1EhJ2LEEW0uqc8BckDLMBoZN0&usqp=CAU" alt="Lisa R." />
                </div>
                <div className="author-info">
                  <h4>Lisa Rodriguez</h4>
                  <p>Networking Summit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Event Management Portal</h2>
              <p>We're dedicated to connecting people with amazing events and experiences. Our platform makes it easy for you to discover, register, and attend events that match your interests and goals.</p>
              <p>Founded in 2023, we've helped thousands of attendees find their perfect event and assisted organizers in creating successful gatherings. Our mission is to make event discovery and attendance as seamless as possible.</p>
              <div className="about-stats">
                <div className="stat">
                  <h3>200+</h3>
                  <p>Events Hosted</p>
                </div>
                <div className="stat">
                  <h3>10k+</h3>
                  <p>Happy Users</p>
                </div>
                <div className="stat">
                  <h3>50+</h3>
                  <p>Categories</p>
                </div>
              </div>
              <button className="learn-more-btn">Learn More About Us</button>
            </div>
            <div className="about-image">
              {/* Replace with actual image */}
              <img src="https://mitendicotthouse.org/wp-content/uploads/2018/12/calendar-meeting.jpg" alt="About Us" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter and never miss an event</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <h3>Event Management Portal</h3>
              <p>Your one-stop platform for discovering and attending amazing events.</p>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/events">Events</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Resources</h4>
                <ul>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/faq">FAQs</Link></li>
                  <li><Link to="/support">Support</Link></li>
                  <li><Link to="/terms">Terms & Conditions</Link></li>
                </ul>
              </div>
              <div className="link-group">
                <h4>Contact Us</h4>
                <ul>
                  <li>Email: info@eventportal.com</li>
                  <li>Phone: +1 (123) 456-7890</li>
                  <li>Address: 123 Event Street, City, Country</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Event Management Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}