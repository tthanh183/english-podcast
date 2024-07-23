import React from 'react';

const Star = ({ filled, onClick }) => (
  <span
    onClick={onClick}
    style={{
      cursor: 'pointer',
      color: filled ? '#ffc107' : '#e4e5e9',
      fontSize: '2rem', // Adjust the size as needed
      margin: '0'
    }}
  >
    ★
  </span>
);

const CustomRating = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          filled={star <= value}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
};

export default CustomRating;
