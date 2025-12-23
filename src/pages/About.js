import React from 'react';
import '../styles/About.css';

// Text has been adapted from the Quantic Project Prompt and with assistance from Claud AI.
// (Claude AI - Prompts for Project Draft Website Structure (Program Setup), 2025) 

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Café Fausse</h1>
        <p>A Story of Passion, Tradition and Culinary Excellence</p>
      </div>

      <div className="about-container">
        <section className="about-story">
          <h2>Our Story</h2>
          <p>
            Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse 
            blends traditional Italian flavors with modern culinary innovation. Our mission is 
            to provide an unforgettable dining experience that reflects both quality and creativity.
          </p>
          <p>
            From our humble beginnings to becoming one of Washington DC's premier fine dining 
            establishments, we've remained committed to authenticity, excellence and the joy 
            of bringing people together over exceptional food.
          </p>
        </section>

        <section className="founders">
          <h2>Meet Our Founders</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-image">
                <div className="placeholder-image">👨‍🍳</div>
              </div>
              <h3>Chef Antonio Rossi</h3>
              <h4>Executive Chef & Co-Founder</h4>
              <p>
                Born in Naples, Italy, Chef Antonio brings over 30 years of culinary expertise 
                to Café Fausse. Trained in classical Italian techniques and passionate about 
                innovation, he crafts each dish with meticulous attention to detail and 
                authentic flavors that transport diners to the heart of Italy.
              </p>
            </div>

            <div className="founder-card">
              <div className="founder-image">
                <div className="placeholder-image">👩‍💼</div>
              </div>
              <h3>Maria Lopez</h3>
              <h4>Restaurateur & Co-Founder</h4>
              <p>
                With a background in hospitality management and a deep appreciation for fine 
                dining, Maria ensures every guest experiences impeccable service and warm 
                hospitality. Her vision and leadership have established Café Fausse as a 
                destination for those seeking an extraordinary dining experience.
              </p>
            </div>
          </div>
        </section>

        <section className="values">
          <h2>Our Commitment</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Locally Sourced Ingredients</h3>
              <p>
                We partner with local farmers and suppliers to bring the freshest, highest-quality 
                ingredients to your table. Supporting our community while ensuring exceptional 
                taste in every dish.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Unforgettable Dining</h3>
              <p>
                Every detail matters. From the ambiance to the presentation, we create memorable 
                experiences that go beyond just a meal. We strive to make each visit special.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🍷</div>
              <h3>Excellent Food & Wine</h3>
              <p>
                Our carefully curated menu features authentic Italian cuisine paired with an 
                extensive wine selection. Each dish is a testament to our dedication to 
                culinary excellence.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Passion & Creativity</h3>
              <p>
                We blend time-honored traditions with modern culinary techniques, creating 
                innovative dishes that honor our Italian heritage while embracing contemporary 
                flavors.
              </p>
            </div>
          </div>
        </section>

        <section className="mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At Café Fausse, our mission is simple yet profound: to provide an unforgettable 
              dining experience that celebrates the artistry of Italian cuisine. We believe 
              that great food brings people together, creates lasting memories and transforms 
              ordinary moments into extraordinary occasions.
            </p>
            <p>
              Every dish we serve, every wine we pour and every interaction we have with our 
              guests is guided by our commitment to quality, authenticity and hospitality. 
              We invite you to join us and discover why Café Fausse has become a beloved 
              destination for food enthusiasts and those seeking the finest in Italian dining.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;