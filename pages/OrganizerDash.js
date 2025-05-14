import React, { useState, useEffect } from "react"
import axios from "axios"
import { Search, Filter, X, Calendar, MapPin, Tag, Users } from "lucide-react"
import Navbar from "../components/Navbar"
import "./OrganizerDash.css"

export default function EnhancedOrganizerDash() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "", description: "" })
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])

  const categories = ["Music", "Sports", "Workshops", "Networking", "Festivals", "Conferences"]
  const types = ["Free", "Paid", "Virtual", "In-person"]
  const locations = ["New York", "San Francisco", "Miami", "London", "Tokyo", "Paris"]

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get("http://localhost:5000/api/events")
        setEvents(data)
        setFilteredEvents(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const results = events.filter(ev => {
      const term = searchTerm.toLowerCase()
      const matchText = ev.name.toLowerCase().includes(term) || ev.description.toLowerCase().includes(term) || ev.location.toLowerCase().includes(term)
      const evDate = new Date(ev.date)
      const from = dateRange.from ? new Date(dateRange.from) : null
      const to = dateRange.to ? new Date(dateRange.to) : null
      const matchDate = (!from || evDate >= from) && (!to || evDate <= to)
      const matchCategory = selectedCategories.length === 0 || (ev.category && selectedCategories.includes(ev.category))
      const matchType = selectedTypes.length === 0 || (ev.type && selectedTypes.includes(ev.type))
      const matchLocation = selectedLocations.length === 0 || selectedLocations.includes(ev.location)
      return matchText && matchDate && matchCategory && matchType && matchLocation
    })
    setFilteredEvents(results)
  }, [searchTerm, dateRange, selectedCategories, selectedTypes, selectedLocations, events])

  const handleChange = e => setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
  const handleCreateEvent = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:5000/api/events/create", newEvent)
      setEvents(prev => [...prev, data.event])
      setShowForm(false)
      setNewEvent({ name: "", date: "", location: "", description: "" })
    } catch (err) {
      console.error(err)
    }
  }

  const toggleSelection = (item, setter, list) => setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  const clearFilters = () => {
    setSearchTerm("")
    setDateRange({ from: "", to: "" })
    setSelectedCategories([])
    setSelectedTypes([])
    setSelectedLocations([])
  }

  // Function to format date nicely for event cards
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  // Function to generate a color based on category (for visual variety)
  const getCategoryColor = (category) => {
    const colorMap = {
      'Music': '#7c3aed',
      'Sports': '#16a34a',
      'Workshops': '#0891b2',
      'Networking': '#ea580c',
      'Festivals': '#db2777',
      'Conferences': '#2563eb',
    };
    return category && colorMap[category] ? colorMap[category] : '#6366f1';
  }

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h2>Your Events</h2>
          <button
            className="create-event-btn"
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? "Close Form" : "Create Event"}
          </button>
        </div>

        {/* Create Event Form */}
        {showForm && (
          <div className="create-form-container">
            <h3>Create New Event</h3>
            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={newEvent.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  value={newEvent.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={newEvent.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search & Filters */}
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search events..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="filter-toggle-btn" onClick={() => setShowFilters(prev => !prev)}>
            <Filter className="filter-icon" /> <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="btn-clear" onClick={clearFilters}>
                <X size={16} /> Clear All
              </button>
            </div>
            <div className="filter-group">
              <h4>Date Range</h4>
              <div className="date-inputs">
                <div className="date-input">
                  <label>From</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={e => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  />
                </div>
                <div className="date-input">
                  <label>To</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={e => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <div className="filter-group">
              <h4>Categories</h4>
              <div className="filter-options">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleSelection(cat, setSelectedCategories, selectedCategories)}
                    className={`filter-option ${selectedCategories.includes(cat) ? 'selected' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h4>Types</h4>
              <div className="filter-options">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleSelection(type, setSelectedTypes, selectedTypes)}
                    className={`filter-option ${selectedTypes.includes(type) ? 'selected' : ''}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h4>Locations</h4>
              <div className="filter-options">
                {locations.map(loc => (
                  <button
                    key={loc}
                    onClick={() => toggleSelection(loc, setSelectedLocations, selectedLocations)}
                    className={`filter-option ${selectedLocations.includes(loc) ? 'selected' : ''}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Event Cards */}
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <div className="no-events">
              <p>No events found matching your criteria.</p>
            </div>
          ) : (
            filteredEvents.map(ev => (
              <div key={ev._id} className="event-card1">
                <div 
                  className="event-card-header" 
                  style={{ 
                    backgroundColor: getCategoryColor(ev.category)
                  }}
                >
                  {ev.category && <span className="event-category">{ev.category}</span>}
                  {ev.type && <span className="event-type">{ev.type}</span>}
                </div>
                <div className="event-card-content">
                  <h3 className="event-title">{ev.name}</h3>
                  
                  <div className="event-meta">
                    <div className="event-meta-item">
                      <Calendar size={18} className="event-icon" />
                      <span>{formatDate(ev.date)}</span>
                    </div>
                    <div className="event-meta-item">
                      <MapPin size={18} className="event-icon" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                  
                  <p className="event-description">{ev.description}</p>
                  
                  <div className="event-actions">
                    <button className="btn-view">View Details</button>
                    <button className="btn-edit">Edit</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}