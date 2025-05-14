import React, { useEffect, useState } from 'react';
import './TicketBooking.css';

const TicketBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    ticketType: ''
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    let amount = 0;
    if (formData.ticketType === 'general') amount = 100; // ₹100
    else if (formData.ticketType === 'vip') amount = 250; // ₹250

    try {
      // Corrected API endpoint
      const response = await fetch('http://localhost:5000/api/payments/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (!data.orderId) {
        alert('Failed to create order');
        return;
      }

      const options = {
        key: 'rzp_test_R3vgse4B9OK9n2', // Your Razorpay Key ID
        amount: amount * 100,
        currency: 'INR',
        name: 'Event Ticket',
        description: 'Ticket Booking Payment',
        image: '/logo192.png',
        order_id: data.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact
        },
        handler: async function (response) {
          const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert('Payment Successful!');
          } else {
            alert('Payment Verification Failed!');
          }
        },
        theme: {
          color: '#00c6ff'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="ticket-container">
      <h2>Book Your Ticket</h2>
      <form className="ticket-form" onSubmit={handlePayment}>
        <input
          type="text"
          id="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          id="contact"
          placeholder="Contact Number"
          required
          value={formData.contact}
          onChange={handleChange}
        />
        <select
          id="ticketType"
          required
          value={formData.ticketType}
          onChange={handleChange}
        >
          <option value="">Select Ticket Type</option>
          <option value="general">General - ₹100</option>
          <option value="vip">VIP - ₹250</option>
        </select>
        <button type="submit">Proceed to Pay</button>
      </form>
    </div>
  );
};

export default TicketBooking;
