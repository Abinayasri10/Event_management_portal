import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Landing';
import OrganizerDashboard from '../pages/OrganizerDash';
import UserDashboard from '../pages/UserDash';
import SignUp from '../components/SignUp';
import Login from '../components/Login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
