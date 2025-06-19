import React from 'react';

function Filter({handleChange}) {
  return (
       <div className='filter-bar d-flex justify-content-center gap-4 p-3 bg-secondary text-white border-bottom'>
            <div className="form-check">
              <input type="checkbox" id="men" onChange={handleChange} className="form-check-input" />
              <label htmlFor="men" className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="women" onChange={handleChange} />
              <label className="form-check-label" htmlFor="women">Female</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="unisex" onChange={handleChange} />
              <label className="form-check-label" htmlFor="unisex">unisex</label>
            </div>
          </div>
  );
}

export default Filter;
