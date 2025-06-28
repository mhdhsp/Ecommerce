import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ItemCard from "./AdminComponents/ItemCard";
import Modal from "./AdminComponents/Modal";

function Products() {
  const [products, setProducts] = useState([]);
  const [susProducts,setSusProducts]=useState([]);
  const [showModal,setShowModal]=useState(false);

  const navigate=useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      let res = await axios.get(`http://localhost:3031/items`);
      setSusProducts(res.data.filter(item=>item.suspend===true));
      setProducts(res.data.filter(item=>item.suspend!==true));
    };
    fetchProducts();
  }, [products]);

  const addNewProduct=()=>{
      navigate("newproduct");
  }

 

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={addNewProduct}>Add New Product</button>
          
        </div>
      </div>

      <div className="row">
        {
          products.length===0?<div className="alert alert-warning text-center" role="alert"><h2>No items</h2></div>:
          products.map((item, index) => (
          <ItemCard item={item} key={index}/>
        ))
        }
      </div>
      <div className="row">
        <h1>Suspended products</h1>
        {
          susProducts.map((item, index) => (
          <ItemCard item={item} key={index}/>
        ))
        }
      </div>
    </div>
  );
}

export default Products;
