import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import DestinationList from '../components/DestinationList';
import { fetchDestinations } from '../api';

const HomePage = () => {
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDestinations = async () => {
      try {
        console.log("Fetching destinations for homepage...");
        setLoading(true);
        const { data } = await fetchDestinations();
        console.log("Homepage destinations fetched successfully:", data.length);
        
        // Sort by rating to get the top destinations
        const sorted = [...data].sort((a, b) => b.rating - a.rating);
        setPopularDestinations(sorted.slice(0, 6)); // Take top 6
        setLoading(false);
        // Clear any previous errors
        setError(null);
      } catch (error) {
        console.error("Error fetching homepage destinations:", error);
        setError('Failed to fetch destinations. Please try again later.');
        setLoading(false);
      }
    };

    getDestinations();
  }, []);

  return (
    <div className="home-page">
      <Hero />
      
      {loading ? (
        <div className="loading-spinner">Loading popular destinations...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          
          <DestinationList 
            destinations={popularDestinations} 
            title="Popular Destinations" 
          />
        
        </>
      )}
    </div>
  );
};

export default HomePage;