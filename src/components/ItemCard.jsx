import React, { useContext } from "react";
import "../components/Card.css";
import { ThemeContext } from "./ThemeContext1";

function ItemCard({ item }) {
  const { theme,themeStyle } = useContext(ThemeContext);

  return (
    <div className="card h-100 shadow-sm hover-card" style={themeStyle}>
      <img
        src={item.image}
        className="card-img-top"
        alt={item.name}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title mb-2">{item.name}</h5>
        <h6
          className="card-subtitle mb-2"
          style={{ color: theme === "dark" ? "#cccccc" : "#6c757d" }}
        >
          ₹{item.price}
        </h6>
      </div>
    </div>
  );
}

export default ItemCard;
