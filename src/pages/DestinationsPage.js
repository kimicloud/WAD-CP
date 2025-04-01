import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import DestinationList from '../components/DestinationList';
import { fetchDestinations } from '../api';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDestinations = async () => {
      try {
        console.log("Fetching destinations...");
        setLoading(true);
        const { data } = await fetchDestinations();
        console.log("Destinations fetched successfully:", data.length);
        setDestinations(data);
        setFilteredDestinations(data);
        setLoading(false);
        // Clear any previous errors if fetch is successful
        setError(null);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setError('Failed to fetch destinations. Please try again later.');
        setLoading(false);
      }
    };

    getDestinations();
  }, []);

  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    if (!term) {
      setFilteredDestinations(destinations);
      return;
    }
    
    const filtered = destinations.filter(destination => 
      destination.name.toLowerCase().includes(term) || 
      destination.location.toLowerCase().includes(term) ||
      (destination.description && destination.description.toLowerCase().includes(term))
    );
    
    setFilteredDestinations(filtered);
  };

  // Check if we have destinations but API request failed
  const hasDestinations = destinations && destinations.length > 0;

  return (
    <div className="destinations-page">
      <div className="destinations-header">
        <h1>Explore Destinations</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading destinations...</div>
      ) : error && !hasDestinations ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {filteredDestinations.length === 0 ? (
            <div className="no-results">
              <p>No destinations match your search. Try different keywords.</p>
            </div>
          ) : (
            <DestinationList 
              destinations={filteredDestinations} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default DestinationsPage;