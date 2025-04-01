import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About TravelExplorer</h1>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At TravelExplorer, we're passionate about helping travelers discover the world's most 
            amazing destinations. Our mission is to inspire adventure, provide reliable information, 
            and make travel planning easier and more enjoyable.
          </p>
        </section>
        
        <section className="about-section">
          <h2>What We Offer</h2>
          <p>
            We provide detailed information about destinations around the world, including:
          </p>
          <ul>
            <li>Comprehensive destination guides</li>
            <li>High-quality photos</li>
            <li>Honest reviews and ratings</li>
            <li>Travel tips and recommendations</li>
            <li>Budget information</li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of passionate travelers, writers, and developers who are dedicated 
            to creating the best travel resource on the web. We've visited hundreds of destinations 
            across the globe and are excited to share our experiences with you.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <p>
            Email: info@travelexplorer.com<br />
            Phone: +1 (123) 456-7890
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;