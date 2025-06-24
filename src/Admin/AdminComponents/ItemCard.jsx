import React from 'react'
import {FaEdit, FaTrash, FaBan} from "react-icons/fa";

function ItemCard({item}) {
  return (
    <div className="col-md-4 mb-4" >
            <div className="card h-100 shadow-sm">
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
                  <button className="btn btn-primary me-2">
                    <FaEdit className="me-1" /> 
                  </button>
                  <button className="btn btn-primary me-2">
                    <FaTrash className="me-1" /> 
                  </button>
                  <button className="btn btn-primary">
                    <FaBan className="me-1" /> 
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default ItemCard