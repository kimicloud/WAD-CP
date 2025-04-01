import React from 'react';
import DestinationCard from './DestinationCard';

const DestinationList = ({ destinations, title }) => {
  return (
    <section className="destination-list">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="destinations-container">
        {destinations.length > 0 ? (
          destinations.map(destination => (
            <DestinationCard key={destination._id} destination={destination} />
          ))
        ) : (
          <p className="no-destinations">No destinations found.</p>
        )}
      </div>
    </section>
  );
};
export default DestinationList;
