import React, { useContext, useState } from "react";
import "./Card.css";
import { ThemeContext } from "./ThemeContext1";

function Filter({ handleButtonClick, handleClick, handleSearchChange }) {
  const { theme,themeStyle,selectStyle} = useContext(ThemeContext);
  const [activeGender, setActiveGender] = useState(null);

  const handleGenderClick = (e) => {
    const gender = e.target.value;
    setActiveGender(gender);
    handleButtonClick(e);
  };

  

  return (
    <div
      className="filter-bar d-flex justify-content-between align-items-center p-3  border-bottom flex-wrap"
      style={themeStyle}
    >
      <div className="btn-group" role="group" aria-label="Gender filter">
        {["All items", "Men", "Women", "Unisex"].map((gender) => (
          <button
            key={gender}
            value={gender}
            onClick={handleGenderClick}
            className={`btn shadow-none bg-transparent px-3 ${
              activeGender === gender ? "active-btn" : ""
            }`}
            style={{
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
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
            style={theme==="dark"?{backgroundColor:"beige",color:"black"}:{}}
            onChange={handleSearchChange}
          />
        </form>

        <select
          onChange={handleClick}
          className="form-select w-auto mt-2 mt-md-0"
          style={selectStyle}
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
