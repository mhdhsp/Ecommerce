import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const [product, setproduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const user = localStorage.getItem("userName");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let product = await axios.get(`http://localhost:3031/items/${id}`);
        setproduct(product.data);
      } catch (e) {
        console.log("Failed to fetch:", e);
      }
    };
    fetchProduct();
  }, [id]);





  const addToCart = async() => {
    if (!user) {
      navigate("/cartloginalert");
    }
    else{
      
     try{
      let userslist=await axios.get(`http://localhost:3031/users/${user}`);
      userslist=userslist.data;
      let list=userslist.cart || [];
      let updatedList=list.push([...list,product]);
      await axios.patch(`http://localhost:3031/users/${user}`,{cart:updatedList});
      console.log(updatedList);
      
      
      
     }
     catch(e){console.log("failed in fetching users",e)};
     
      
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mb-4 shadow-sm p-4">
        <div className="row g-4 align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <h4 className="text-primary mb-3">₹{product.price}</h4>
            <p><strong>Size:</strong> {product.size}</p>
            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-success" onClick={addToCart}>
                Add to Cart
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/collection")}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
