import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import DestinationList from '../components/DestinationList';

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Your Favorite Destinations</h1>
      </div>
      
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't saved any favorites yet.</p>
          <p>Explore our destinations and add some to your favorites!</p>
          <a href="/destinations" className="btn-primary">Browse Destinations</a>
        </div>
      ) : (
        <DestinationList destinations={favorites} />
      )}
    </div>
  );
};

export default FavoritesPage;