import React from 'react';

const HazardMapLive = () => {
  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <iframe
        src="/hazard-map/index.html"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Hazard Map"
      />
    </div>
  );
};

export default HazardMapLive;
