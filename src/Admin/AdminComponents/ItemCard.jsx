import axios from "axios";
import React from "react";
import "../../components/Card.css"
import { FaEdit, FaTrash, FaBan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ItemCard({ item }) {
  const navigate=useNavigate();
  const deleteItem = async () => {
    try {
      await axios.delete(`http://localhost:3031/items/${item.id}`);
    } catch {
      console.log("failed to delete item");
    }
  };

  const editItem=()=>{
    navigate("editproduct", {state:{item}});
  };

  const suspendItems=()=>{
    let value;
    if(item.suspend)
       value=false;
      else 
      value=true;
    let data={...item,suspend:value};
    axios.patch(`http://localhost:3031/items/${item.id}`,data);

  }
  return (
    <div className=" col-md-4 mb-4">
      <div className="card h-100 shadow-sm hover-card">
        <img
          src={item.image}
          className="card-img-top"
          alt={item.name}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            <strong>Price:</strong> ₹{item.price} <br />
            <strong>Gender:</strong> {item.gender} <br />
            <strong>Color:</strong> {item.color} <br />
            <strong>Stock:</strong> {item.stock} <br />
            <strong>Sizes:</strong> {item.sizes.join(", ")}
          </p>
          <p className="card-text">
            <small className="text-muted">{item.description}</small>
          </p>

          <div>
            <button className="btn btn-primary me-2" onClick={editItem}>
              <FaEdit className="me-1" />
            </button>
            <button className="btn btn-primary me-2" onClick={deleteItem}>
              <FaTrash className="me-1" />
            </button>
            <button className="btn btn-primary" onClick={suspendItems}>
              <FaBan className="me-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
