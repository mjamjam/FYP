import React from 'react';

const Card = ({ children }) => {
  return (
    <div style={cardStyle}>
      {children}
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  padding: '16px',
  margin: '20px auto',
  width: '80%',
  textAlign: 'left'
};

export default Card;
