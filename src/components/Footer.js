import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/newsletter', { email });
      setMessage(response.data.message);
      setIsError(false);
      setEmail('');
      
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to subscribe. Please try again.');
      setIsError(true);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Café Fausse</h3>
          <p>Fine dining experience with authentic Italian cuisine</p>
        </div>

        <div className="footer-section">
          <h4>Contact Information</h4>
          <p>1234 Culinary Ave, Suite 100</p>
          <p>Washington, DC 20002</p>
          <p>Phone: (202) 555-4567</p>
        </div>

        <div className="footer-section">
          <h4>Hours</h4>
          <p>Monday - Saturday: 5:00 PM - 11:00 PM</p>
          <p>Sunday: 5:00 PM - 9:00 PM</p>
        </div>

        <div className="footer-section newsletter">
          <h4>Newsletter Signup</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && (
            <p className={`message ${isError ? 'error' : 'success'}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Café Fausse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;