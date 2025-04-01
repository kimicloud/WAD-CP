import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add a destination to favorites
  const addToFavorites = (destination) => {
    if (!favorites.some(fav => fav._id === destination._id)) {
      setFavorites([...favorites, destination]);
    }
  };

  // Remove a destination from favorites
  const removeFromFavorites = (destinationId) => {
    setFavorites(favorites.filter(fav => fav._id !== destinationId));
  };

  // Check if a destination is in favorites
  const isFavorite = (destinationId) => {
    return favorites.some(fav => fav._id === destinationId);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};