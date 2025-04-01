import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../contexts/FavoritesContext';
import FavoriteButton from './FavoriteButton';

const DestinationCard = ({ destination }) => {
  const { _id, name, location, image, price, rating } = destination;
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  
  const favorite = isFavorite(_id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(_id);
    } else {
      addToFavorites(destination);
    }
  };

  return (
    <div className="destination-card">
      <div className="destination-card-image">
        <img src={image} alt={name} />
        <FavoriteButton 
          isFavorite={favorite} 
          onClick={handleFavoriteClick} 
        />
      </div>
      <div className="destination-card-content">
        <h3>{name}</h3>
        <p className="location">{location}</p>
        <div className="card-footer">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>★</span>
            ))}
            <span className="rating-text">{rating.toFixed(1)}</span>
          </div>
          <p className="price">${price} <span>per day</span></p>
        </div>
        <Link to={`/destinations/${_id}`} className="btn-secondary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;