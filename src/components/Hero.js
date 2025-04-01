import React from 'react';
import { Link } from 'react-router-dom';
//import heroBackground from '../images/hero-background.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1>Discover Amazing Places</h1>
        <p>Explore breathtaking destinations around the world</p>
        <Link to="/destinations" className="btn-primary">
          Explore Destinations
        </Link>
      </div>
    </section>
  );
};

export default Hero;
