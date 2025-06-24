import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ItemCard from "./AdminComponents/ItemCard";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      let res = await axios.get(`http://localhost:3031/items`);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const addNewProduct=()=>{
      navigate("newproduct");
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={addNewProduct}>Add New Product</button>
          <button className="btn btn-primary">Remove all products</button>
        </div>
      </div>

      <div className="row">
        {products.map((item, index) => (
          <ItemCard item={item} key={index}/>
        ))}
      </div>
    </div>
  );
}

export default Products;
