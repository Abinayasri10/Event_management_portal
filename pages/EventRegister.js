import React, { useState } from 'react';
import axios from 'axios';
import './EventRegister.css';

const EVENT_API = 'http://localhost:5000/api';

const EventRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ticketQuantity: 1,
    ticketType: 'standard',
    specialRequirements: '',
    eventName: '',
    eventStartTime: ''
  });

  const [totalPrice, setTotalPrice] = useState(500); 
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const calculateTotal = (quantity, type) => {
    const pricePerTicket = type === 'standard' ? 500 : 1000;
    setTotalPrice(pricePerTicket * quantity);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (name === 'ticketQuantity' || name === 'ticketType') {
      calculateTotal(
        name === 'ticketQuantity' ? parseInt(value) : formData.ticketQuantity,
        name === 'ticketType' ? value : formData.ticketType
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.eventName || !formData.eventStartTime) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const registrationData = {
        ...formData,
        quantity: formData.ticketQuantity,
        paymentMethod,
        totalPrice,
        registrationDate: new Date().toISOString()
      };

      const response = await axios.post(`${EVENT_API}/event-registers/register`, registrationData);
      setSuccessMessage('Registration successful!');
      setTimeout(() => {
        window.location.href = '/eventcalendar'; // Redirect to event calendar after 2 seconds
      }, 2000);
    } catch (err) {
      setError('Registration failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="eventregister-container">
      <div className="registration-form-container">
        <h3>Register for this Event</h3>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <h4>Personal Info</h4>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />

          <h4>Event Details</h4>
          <input type="text" name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleInputChange} required />
          <input type="datetime-local" name="eventStartTime" value={formData.eventStartTime} onChange={handleInputChange} required />

          <h4>Ticket Info</h4>
          <input type="number" name="ticketQuantity" min="1" value={formData.ticketQuantity} onChange={handleInputChange} />
          <select name="ticketType" value={formData.ticketType} onChange={handleInputChange}>
            <option value="standard">Standard - ₹500</option>
            <option value="vip">VIP - ₹1000</option>
          </select>

          <h4>Special Requirements</h4>
          <textarea name="specialRequirements" placeholder="Any requests?" value={formData.specialRequirements} onChange={handleInputChange}></textarea>

          <h4>Payment Method</h4>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="creditCard">Credit Card</option>
            <option value="upi">UPI</option>
            <option value="netBanking">Net Banking</option>
            <option value="cash">Cash</option>
          </select>

          <p>Total: ₹{totalPrice}</p>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventRegister;
