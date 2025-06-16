import React from 'react';

function ItemCard({ item }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={item.image}
        className="card-img-top"
        alt={item.name}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title mb-2">{item.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">₹{item.price}</h6>
      </div>
    </div>
  );
}

export default ItemCard;
