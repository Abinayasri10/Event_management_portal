import { useState } from 'react';
import { login as loginApi, signup as signupApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginSignup.css';


export default function LoginSignup({ mode = 'login', onClose }) {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'attendee',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.email || !form.password) {
      return 'Email and Password are required';
    }
    if (mode === 'signup' && !form.name) {
      return 'Name is required';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }

    try {
      if (mode === 'login') {
        const res = await loginApi(form);
        login(res.data);
        onClose();
        nav(res.data.user.role === 'organizer' ? '/organizer' : '/user');
      } else {
        // Signup flow
        await signupApi(form);
        setSuccessMessage('Account created successfully!');
        setError(null); // Reset any previous errors
        setForm({ name: '', email: '', password: '', role: 'attendee' }); // Clear form after signup
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'An error occurred');
      setSuccessMessage(null); // Hide success message on error
    }
  };

  return (
   
    <div className="form-container">
      <h2>Login / SignUp</h2>
      <form onSubmit={handleSubmit} className="form">
        {mode === 'signup' && (
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="input"
            value={form.name}
            required
          />
        )}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input"
          type="email"
          value={form.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="input"
          value={form.password}
          required
        />
        {mode === 'signup' && (
          <select name="role" onChange={handleChange} className="input" value={form.role}>
            <option value="attendee">Attendee / User</option>
            <option value="organizer">Organizer</option>
          </select>
        )}
        <button className="btn w-full">
          {mode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>
      
      {/* Show error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Show success message after signup */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="toggle-container">
        {mode === 'login' ? (
          <p>
            Don't have an account?{' '}
            <span className="toggle-link" onClick={() => nav('/signup')}>
              Sign up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span class="toggle-link" onClick={() => nav('/login')}>
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  
  
  );
}
