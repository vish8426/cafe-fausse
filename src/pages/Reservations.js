import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Reservations.css';

function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please enter a valid email address');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!formData.date || !formData.time) {
      setMessage('Please select both date and time');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const timeSlot = `${formData.date} ${formData.time}`;
      const response = await axios.post('http://localhost:5000/api/reservations', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        timeSlot: timeSlot,
        guests: parseInt(formData.guests)
      });

      setMessage(response.data.message);
      setIsError(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2'
      });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to make reservation. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate time slots (5 PM - 10 PM for Mon-Sat, 5 PM - 8 PM for Sun)
  const getClosingTime = (dateString) => {
    if (!dateString) return 22; // Default to 10 PM - 1 hour off closing time
    
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Sunday closes at 9 PM (last reservation 8 PM)
    if (dayOfWeek === 0) return 20; // 8 PM is last slot
    
    // Monday-Saturday close at 11 PM (last reservation 10 PM)
    return 22; // 10 PM is last slot
  };

  const generateTimeSlots = () => {
    const slots = [];
    const closingHour = getClosingTime(formData.date);
    
    // Start at 5 PM (17:00)
    for (let hour = 17; hour <= closingHour; hour++) {
      for (let min = 0; min < 60; min += 30) {
        // Skip the last slot if it's at closing time
        if (hour === closingHour && min === 30) break;
        
        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        const displayTime = formatTime(time);
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="reservations-page">
      <div className="reservations-hero">
        <h1>Make a Reservation</h1>
        <p>Reserve your table for an unforgettable dining experience</p>
      </div>

      <div className="reservations-container">
        <div className="reservation-info">
          <h2>Reservation Information</h2>
          <div className="info-item">
            <h3>Hours</h3>
            <p>Monday - Saturday: 5:00 PM - 11:00 PM</p>
            <p>Sunday: 5:00 PM - 9:00 PM</p>
          </div>
          <div className="info-item">
            <h3>Contact</h3>
            <p>Phone: (202) 555-4567</p>
            <p>Email: reservations@cafefausse.com</p>
          </div>
          <div className="info-item">
            <h3>Location</h3>
            <p>1234 Culinary Ave, Suite 100</p>
            <p>Washington, DC 20002</p>
          </div>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <h2>Reservation Details</h2>
          
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(Optional)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={(e) => {
                  handleChange(e);
                  // Clear time selection when date changes to force re-selection
                  setFormData(prev => ({ ...prev, time: '' }));
                }}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">Select time</option>
                {generateTimeSlots().map(slot => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests *</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          {message && (
            <div className={`message ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Reserve Table'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reservations;