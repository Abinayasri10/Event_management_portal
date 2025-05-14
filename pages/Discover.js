import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Discover.css';

const Discover = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const navigate = useNavigate();

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
        
        // Extract unique categories from events
        const eventCategories = [...new Set(response.data.map(event => 
          event.category || 'uncategorized'))];
        
        setCategories(eventCategories);
      } catch (error) {
        console.error('Error fetching events:', error);
        
        // Fallback to mock data if API call fails
        const mockEvents = [
        {
          id: 1,
          title: "Tech Conference 2025",
          description: "Join us for the biggest tech conference of the year featuring the latest innovations and speakers.",
          date: "2025-06-15",
          time: "09:00 AM",
          location: "San Francisco Convention Center",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsbP1SjH7EkE1TXIwAcnjd0wZOTem0iIlysA&s",
          category: "tech",
          price: 299,
          organizer: "TechCorp Inc.",
          attendees: 458
        },
        {
          id: 2,
          title: "Summer Music Festival",
          description: "A two-day outdoor music festival featuring top artists from around the world.",
          date: "2025-07-22",
          time: "12:00 PM",
          location: "Golden Gate Park",
          image: "https://a.storyblok.com/f/188325/1024x681/b70ae71a00/screen-shot-2018-11-28-at-18-44-51-1024x681.jpg",
          category: "music",
          price: 150,
          organizer: "SoundWave Productions",
          attendees: 2500
        },
        {
          id: 3,
          title: "Startup Networking Mixer",
          description: "Connect with fellow entrepreneurs and investors in this casual networking event.",
          date: "2025-05-30",
          time: "06:30 PM",
          location: "Downtown Business Hub",
          image: "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          category: "business",
          price: 25,
          organizer: "Founder's Circle",
          attendees: 120
        },
        {
          id: 4,
          title: "Charity Gala Dinner",
          description: "Annual black-tie fundraiser supporting children's education initiatives.",
          date: "2025-08-05",
          time: "07:00 PM",
          location: "Luxury Palace Hotel",
          image: "https://blog.inevent.com/wp-content/uploads/2024/05/top_20_tech_conferences_to_attend_in_2024.webp",
          category: "charity",
          price: 500,
          organizer: "Future Bright Foundation",
          attendees: 300
        },
        {
          id: 5,
          title: "Cooking Workshop: Mediterranean Cuisine",
          description: "Learn to cook authentic Mediterranean dishes with Chef Maria Hernandez.",
          date: "2025-06-08",
          time: "02:00 PM",
          location: "Culinary Institute",
          image: "/api/placeholder/400/250",
          category: "food",
          price: 85,
          organizer: "Taste Adventures",
          attendees: 30
        },
        {
          id: 6,
          title: "Yoga Retreat Weekend",
          description: "Rejuvenate with yoga, meditation, and healthy food in a peaceful countryside setting.",
          date: "2025-07-10",
          time: "08:00 AM",
          location: "Serenity Resort & Spa",
          image: "https://live-ndevr-io.s3.amazonaws.com/uploads/2017/03/tech-conferences-pro-con-ndevr.jpg",
          category: "health",
          price: 350,
          organizer: "Mindful Living Co.",
          attendees: 40
        },
        {
          id: 7,
          title: "Digital Marketing Conference",
          description: "Discover the latest trends and strategies in digital marketing.",
          date: "2025-09-12",
          time: "09:30 AM",
          location: "Marketing Hub",
          image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/austin/Conference-Technologies-Inc-e782bea3db842e7_e782c075-e314-5af9-6465e3655f8205be.jpg",
          category: "tech",
          price: 199,
          organizer: "MarketPro Solutions",
          attendees: 275
        },
        {
          id: 8,
          title: "Contemporary Art Exhibition",
          description: "Featuring works from emerging artists exploring themes of technology and nature.",
          date: "2025-06-20",
          time: "10:00 AM",
          location: "Modern Art Gallery",
          image: "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2022/08/18/3396766-1943335736.jpg?itok=Sz1J_DZt",
          category: "art",
          price: 15,
          organizer: "Creative Visions Foundation",
          attendees: 180
        }
      ];

        setEvents(mockEvents);
        
        // Extract categories from mock data
        const eventCategories = [...new Set(mockEvents.map(event => event.category))];
        setCategories(eventCategories);
      } finally {
        setFilteredEvents(events);
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  useEffect(() => {
    // Filter and sort events when dependencies change
    let filtered = [...events];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) || 
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch(sortOption) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popularity':
          return b.attendees - a.attendees;
        default:
          return new Date(a.date) - new Date(b.date);
      }
    });
    
    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [events, selectedCategory, searchTerm, sortOption]);

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle category click
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Modify event card display
  return (
    <div className="discover-container">
      {/* Navbar */}
      <nav>
        <h2 className='hc'><b>Event Management Portal</b></h2>
        <ul>
          <li><Link to="/user" className={window.location.pathname === '/home' ? 'active' : ''}>Home</Link></li>
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
          <button className="get-tickets">Get Tickets</button>
        </div>
      </nav>
      
      <div className="discover-header">
        <h1>Discover Events</h1>
        <p>Find and join amazing events happening around you</p>
      </div>

      <div className="search-filter-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search for events..." 
            value={searchTerm}
            onChange={handleSearch}
          />
          <button type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="filter-sort">
          <div className="filter-dropdown">
            <label htmlFor="sort-options">Sort by:</label>
            <select 
              id="sort-options" 
              value={sortOption} 
              onChange={handleSortChange}
            >
              <option value="date-asc">Date (Soonest First)</option>
              <option value="date-desc">Date (Latest First)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </div>

      <div className="category-nav">
        <button 
          className={selectedCategory === 'all' ? 'active' : ''} 
          onClick={() => handleCategoryChange('all')}
        >
          All Events
        </button>
        {categories.map(category => (
          <button 
            key={category} 
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading events...</p>
        </div>
      ) : (
        <>
          {filteredEvents.length === 0 ? (
            <div className="no-events">
              <i className="fas fa-calendar-times"></i>
              <h3>No events found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="events-grid">
                {currentEvents.map(event => (
                  <div className="event-card" key={event.id}>
                    <div className="event-image">
                      <img src={event.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsbP1SjH7EkE1TXIwAcnjd0wZOTem0iIlysA&s'} alt={event.title} />
                      <div className="event-category">{event.category}</div>
                    </div>
                    <div className="event-details">
                      <h3>{event.title}</h3>
                      <div className="event-meta">
                        <div className="meta-item">
                          <i className="fas fa-calendar"></i>
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="meta-item">
                          <i className="fas fa-clock"></i>
                          <span>{event.time}</span>
                        </div>
                        <div className="meta-item">
                          <i className="fas fa-map-marker-alt"></i>
                          <span>{event.location}</span>
                        </div>
                        <div className="meta-item">
                          <i className="fas fa-user-friends"></i>
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      <p className="event-description">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="page-nav"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="page-nav"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
      
      <div className="featured-section">
        <h2>Featured Categories</h2>
        <div className="featured-categories">
          <div className="featured-category">
            <i className="fas fa-laptop-code"></i>
            <h3>Tech Events</h3>
            <p>Stay updated with the latest technology trends and innovations</p>
          </div>
          <div className="featured-category">
            <i className="fas fa-music"></i>
            <h3>Music & Concerts</h3>
            <p>Experience live performances from your favorite artists</p>
          </div>
          <div className="featured-category">
            <i className="fas fa-briefcase"></i>
            <h3>Business Networking</h3>
            <p>Connect with professionals and grow your business network</p>
          </div>
          <div className="featured-category">
            <i className="fas fa-utensils"></i>
            <h3>Food & Drink</h3>
            <p>Discover culinary experiences and food festivals</p>
          </div>
        </div>
      </div>
      
      <div className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest events and exclusive offers</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button type="submit">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Discover;