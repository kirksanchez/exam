import React from 'react';

const Launch = ({ launch }) => {
  return (
    <div className='launch'>
      <img
        src={launch.links.patch.small}
        alt={`Mission ${launch.name} patch`}
        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
      />
      <div>
        <h2>
          Flight number: {launch.flight_number} - {launch.name} (
          {new Date(launch.date_utc).getFullYear()})
        </h2>
        <p>Details: {launch.details || 'No details available'}</p>
      </div>
    </div>
  );
};

export default Launch;
