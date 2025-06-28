import React from 'react';
import './Card.css';
import { useOutletContext, Link } from 'react-router-dom';
import ItemCard from './ItemCard';

function Men() {
  const items = useOutletContext();

  // Filter only men's items
  const menItems = items.filter(item => item.gender?.toLowerCase() === 'men');

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 fw-bold">👕 Men's Collection</h3>
      <div className="row g-4 justify-content-center">
        {menItems.length > 0 ? (
          menItems.map(item => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <Link to={`/items/${item.id}`} className="text-decoration-none text-dark">
                <ItemCard item={item} />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No men's items found.</div>
        )}
      </div>
    </div>
  );
}

export default Men;
