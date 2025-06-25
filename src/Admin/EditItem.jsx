import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditItem() {
    const location=useLocation();
    const {item}=location.state;
    console.log(item);
    
  const options = ["s", "M", "L", "XL"];
  const [selectedOptions, setSelectedOptions] = useState(item.sizes||[]);
  const navigate=useNavigate();
  
  const [product,setProduct]=useState(item)


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (selectedOptions.includes(value) === false)
        setSelectedOptions([...selectedOptions, value]);
    } else setSelectedOptions(selectedOptions.filter((item) => item !== value));

    console.log(selectedOptions);
  };

  const handleChange=e=>{
    setProduct({...product,[e.target.name]:e.target.value})
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const data={...product,sizes:selectedOptions};
    console.log(data);
    setProduct({})
    try
    {
      await axios.patch(`http://localhost:3031/items/${item.id}`,data);
    }
    catch(e)
      {
        console.log("post failed",e);
      }
      navigate("/admin/products");
      
      
  }

  return (
    <div className="container mt-4">
      <form className="p-4 border rounded shadow bg-light" onSubmit={handleSubmit}>
  <div className="mb-3">
    <input
      className="form-control"
      type="text"
      name="name"
      placeholder="Enter the name of product"
      onChange={handleChange}
      value={product.name}
      required
    />
  </div>

  <div className="mb-3">
    <input
      className="form-control"
      type="number"
      name="price"
      placeholder="Enter the price of product"
      onChange={handleChange}
      value={product.price}
      required
      min="1"
    />
  </div>

  <div className="mb-3">
    <input
      className="form-control"
      type="text"
      name="gender"
      placeholder="Enter the gender"
      onChange={handleChange}
      value={product.gender}
      required
    />
  </div>

  <div className="mb-3">
    <input
      className="form-control"
      type="text"
      name="color"
      placeholder="Enter the color name of the product"
      onChange={handleChange}
      value={product.color}
      required
    />
  </div>

  <div className="mb-3">
    <input
      className="form-control"
      type="text"
      name="image"
      placeholder="Enter the URL of the product image"
      onChange={handleChange}
      value={product.image}
      required
    />
  </div>

  <div className="mb-3">
    <input
      className="form-control"
      type="text"
      name="description"
      placeholder="Enter a description about the product"
      onChange={handleChange}
      value={product.description}
      required
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Available Sizes:</label>
    <div className="form-check">
      {options.map((item, index) => (
        <div key={index} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            value={item}
            onChange={handleCheckboxChange}
            id={`checkbox-${item}`}
            checked={selectedOptions.includes(item)}
          />
          <label className="form-check-label" htmlFor={`checkbox-${item}`}>
            {item}
          </label>
        </div>
      ))}
    </div>
    {selectedOptions.length === 0 && (
      <small className="text-danger">Please select at least one size.</small>
    )}
  </div>

  <div className="mb-3">
    <input
      className="form-control"
      type="number"
      name="stock"
      placeholder="Enter the available stock of the product"
      onChange={handleChange}
      value={product.stock}
      required
      min="1"
    />
  </div>

  <button type="submit" className="btn btn-primary">
    Update the product
  </button>
</form>

    </div>
  );
}

export default EditItem;
