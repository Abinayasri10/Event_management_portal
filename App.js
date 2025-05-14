import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import OrganizerDash from './pages/OrganizerDash';
import UserDash from './pages/UserDash';
import EventCalendar from './pages/EventCalendar'; 
import EventRegister from './pages/EventRegister'; 
import Home from './pages/Home';
import RegisteredEvents from './pages/RegisteredEvents'; 
import Discover from './pages/Discover';
import TicketBooking from './pages/TicketBooking';

const Private = ({ role, children }) => {
  const { user } = useAuth();
  return user && user.role === role ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/eventcalendar" element={<EventCalendar />} /> 
          <Route path="/eventregister" element={<EventRegister />} /> 
          <Route path="/eventregister/:id" element={<EventRegister />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisteredEvents />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/ticketbooking" element={<TicketBooking />} />
          <Route
            path="/organizer"
            element={
              <Private role="organizer">
                <OrganizerDash />
              </Private>
            }
          />
          <Route
            path="/user"
            element={
              <Private role="attendee">
                <UserDash />
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
