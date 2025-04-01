import React from 'react';

const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <button 
      className={`favorite-button ${isFavorite ? 'active' : ''}`}
      onClick={onClick}
    >
      <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
    </button>
  );
};

export default FavoriteButton;