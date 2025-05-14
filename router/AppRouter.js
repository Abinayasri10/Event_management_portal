import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import OrganizerDashboard from '../pages/OrganizerDash';
import UserDashboard from '../pages/UserDash';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import EventCalendar from '../pages/EventCalendar';
import EventRegister from '../pages/EventRegister';
import Home from '../pages/Home';
import RegisteredEvents from '../pages/RegisteredEvents';
import Discover from '../pages/Discover';
import TicketBooking from '../pages/TicketBooking';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/eventcalendar" element={<EventCalendar />} />
        <Route path="/eventregister" element={<EventRegister />} />
        <Route path="/eventregister/:id" element={<EventRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisteredEvents />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/ticketbooking" element={<TicketBooking />} />
        {/* Add more routes as needed */}
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
