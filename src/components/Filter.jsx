import React from 'react';

function Filter({ handleChange, handleClick }) {
  return (
    <div className='filter-bar d-flex justify-content-center gap-4 p-3 bg-secondary text-white border-bottom'>
      <div className="form-check">
        <input type="checkbox" id="men" onChange={handleChange} className="form-check-input" />
        <label htmlFor="men" className="form-check-label">Male</label>
      </div>
      <div className="form-check">
        <input type="checkbox" id="women" onChange={handleChange} className="form-check-input" />
        <label htmlFor="women" className="form-check-label">Female</label>
      </div>
      <div className="form-check">
        <input type="checkbox" id="unisex" onChange={handleChange} className="form-check-input" />
        <label htmlFor="unisex" className="form-check-label">Unisex</label>
      </div>

      <select onChange={handleClick} className="form-select w-auto bg-light text-dark">
        <option disabled selected>Sort</option>
        <option value="toHigh">Low to High</option>
        <option value="toLow">High to Low</option>
      </select>
    </div>
  );
}

export default Filter;
