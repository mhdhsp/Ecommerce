import React, { useState } from "react";

import "./Card.css";
function Filter({ handleButtonClick, handleClick, handleSearchChange }) {
  const [activeGender, setActiveGender] = useState(null);

  const handleGenderClick = (e) => {
    const gender = e.target.value;
    setActiveGender(gender);
    handleButtonClick(e);
  };

  return (
    <div className="filter-bar d-flex justify-content-between align-items-center p-3 bg-white border-bottom flex-wrap">


      <div className="btn-group" role="group" aria-label="Gender filter">
        {["All items", "Men", "Women", "Unisex"].map((gender) => (
          <button
            key={gender}
            value={gender}
            onClick={handleGenderClick}
            className={`btn shadow-none bg-transparent px-3 ${
              activeGender === gender ? "active-btn" : ""
            }`}
          >
            {gender}
          </button>
        ))}
      </div>
        <div className="d-flex">
      <form className="d-flex me-3 mb-2 mb-md-0" role="search">
        <input
          type="search"
          className="form-control me-2"
          placeholder="Search tees..."
          aria-label="Search"
          style={{ minWidth: "200px" }}
          onChange={handleSearchChange}
        />
      </form>

      <select
        onChange={handleClick}
        className="form-select w-auto bg-light text-dark mt-2 mt-md-0"
      >
        <option disabled selected>
          Sort
        </option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>
      </div>
    </div>
  );
}

export default Filter;
