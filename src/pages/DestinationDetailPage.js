import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDestinationById, bookTrip } from '../api';
import { FavoritesContext } from '../contexts/FavoritesContext';
import FavoriteButton from '../components/FavoriteButton';

const DestinationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  
  // Booking form state
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    guests: 1,
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  useEffect(() => {
    const getDestination = async () => {
      try {
        console.log(`Fetching destination details for id: ${id}`);
        setLoading(true);
        const { data } = await fetchDestinationById(id);
        console.log("Destination fetched successfully:", data.name);
        setDestination(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination:", error);
        setError('Failed to fetch destination details. The destination may not exist or there was a server error.');
        setLoading(false);
      }
    };

    getDestination();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite(destination._id)) {
      removeFromFavorites(destination._id);
    } else {
      addToFavorites(destination);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus('loading');
    setBookingMessage('Processing your booking...');
    
    try {
      // Calculate total price to store in the database
      const totalPrice = calculateTotalPrice();
      
      // Prepare complete booking data
      const completeBookingData = {
        destinationId: destination._id,
        destinationName: destination.name,
        destinationLocation: destination.location,
        pricePerDay: destination.price,
        totalPrice,
        ...bookingData
      };
      
      const response = await bookTrip(completeBookingData);
      
      setBookingStatus('success');
      setBookingMessage(response.data.message || 'Your booking was successful! Check your email for confirmation details.');
      
      // Reset form after success
      setTimeout(() => {
        setShowBookingForm(false);
        setBookingStatus(null);
        // Reset form fields
        setBookingData({
          startDate: '',
          endDate: '',
          guests: 1,
          fullName: '',
          email: '',
          phone: '',
          specialRequests: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error("Booking error:", error);
      setBookingStatus('error');
      setBookingMessage('There was a problem processing your booking. Please try again.');
    }
  };
  
  // Calculate total price based on dates and guests
  const calculateTotalPrice = () => {
    if (!destination || !bookingData.startDate || !bookingData.endDate) return 0;
    
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    
    return destination.price * days * bookingData.guests;
  };

  if (loading) return <div className="loading-spinner">Loading destination details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!destination) return <div className="error-message">Destination not found</div>;

  // Format today's date for min date in form
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="destination-detail-page">
      <div className="destination-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h1>{destination.name}</h1>
        <p className="location">{destination.location}</p>
      </div>

      <div className="destination-image-container">
        <img src={destination.image} alt={destination.name} className="main-image" />
        <FavoriteButton 
          isFavorite={isFavorite(destination._id)} 
          onClick={handleFavoriteClick} 
        />
      </div>

      <div className="destination-info">
        <div className="info-header">
          <div className="rating">
          {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(destination.rating) ? 'star filled' : 'star'}>★</span>
            ))}
            <span className="rating-text">{destination.rating.toFixed(1)}</span>
          </div>
          <p className="price">${destination.price} <span>per day</span></p>
        </div>

        <div className="description">
          <h3>About this destination</h3>
          <p>{destination.description}</p>
        </div>

        <div className="details-section">
          <h3>Activities</h3>
          <ul className="activities-list">
            {destination.activities && destination.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        <div className="details-section">
          <h3>Best Time to Visit</h3>
          <p>{destination.bestTimeToVisit}</p>
        </div>

        <div className="cta-button">
          {!showBookingForm ? (
            <button 
              className="btn-primary"
              onClick={() => setShowBookingForm(true)}
            >
              Book This Trip
            </button>
          ) : (
            <div className="booking-form-container">
              <h3>Book Your Trip to {destination.name}</h3>
              
              {bookingStatus && (
                <div className={`alert alert-${bookingStatus}`}>
                  <i className={`fas fa-${
                    bookingStatus === 'success' ? 'check-circle' : 
                    bookingStatus === 'error' ? 'exclamation-circle' : 'spinner fa-spin'
                  }`}></i>
                  <p>{bookingMessage}</p>
                </div>
              )}
              
              <form onSubmit={handleBookingSubmit} className="booking-form">
                {/* Personal Information */}
                <div className="form-section">
                  <h4>Personal Information</h4>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={bookingData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Trip Details */}
                <div className="form-section">
                  <h4>Trip Details</h4>
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      min={today}
                      value={bookingData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      min={bookingData.startDate || today}
                      value={bookingData.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      min="1"
                      max="10"
                      value={bookingData.guests}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Additional Information */}
                <div className="form-section">
                  <h4>Additional Information</h4>
                  <div className="form-group">
                    <label htmlFor="specialRequests">Special Requests</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows="3"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                
                {(bookingData.startDate && bookingData.endDate) && (
                  <div className="price-summary">
                    <p>Total Price: ${calculateTotalPrice()}</p>
                  </div>
                )}
                
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowBookingForm(false)}>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={bookingStatus === 'loading'}
                  >
                    {bookingStatus === 'loading' ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;