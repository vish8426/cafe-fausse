import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Text has been adapted from the Quantic Project Prompt and with assistance from Claud AI.
// (Claude AI - Prompts for Project Draft Website Structure (Program Setup), 2025) 

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Café Fausse</h1>
          <p className="hero-subtitle">An Unforgettable Fine Dining Experience</p>
          <Link to="/reservations" className="cta-button">Make a Reservation</Link>
        </div>
      </section>

      <section className="welcome">
        <div className="container">
          <h2>Welcome to Café Fausse</h2>
          <p className="welcome-text">
            Experience the perfect blend of traditional Italian flavors and modern culinary innovation. 
            Our commitment to excellence and passion for authentic cuisine creates an unforgettable 
            dining experience in the heart of Washington, DC.
          </p>
        </div>
      </section>

      <section className="highlights">
        <div className="container">
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">🍽️</div>
              <h3>Authentic Cuisine</h3>
              <p>Traditional Italian dishes prepared with locally sourced ingredients</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>Led by renowned Chef Antonio Rossi</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🏆</div>
              <h3>Award Winning</h3>
              <p>Restaurant of the Year 2023 and multiple culinary awards</p>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>Location</h3>
              <p>1234 Culinary Ave, Suite 100</p>
              <p>Washington, DC 20002</p>
            </div>
            <div className="info-card">
              <h3>Contact</h3>
              <p>Phone: (202) 555-4567</p>
              <p>Email: info@cafefausse.com</p>
            </div>
            <div className="info-card">
              <h3>Hours</h3>
              <p>Mon-Sat: 5:00 PM - 11:00 PM</p>
              <p>Sunday: 5:00 PM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Dine With Us?</h2>
          <p>Reserve your table today and experience fine dining at its best</p>
          <Link to="/reservations" className="cta-button">Book Now</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;