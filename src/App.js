import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './context/AuthContext';

import Landing from './pages/Landing';
import OrganizerDash from './pages/OrganizerDash';
import UserDash from './pages/UserDash';

const Private = ({ role, children }) => {
  const { user } = useAuth();
  console.log('Private route check:', { user });
  return user && user.role === role ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
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
