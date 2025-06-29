import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const options = ["s", "M", "L", "XL"];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate=useNavigate();
  const init={
    name: "",
      price:"",
      gender: "",
      color: "",
      image: "",
      description: "",
      sizes: "",
      stock: ""
  }
  const [newProduct,setNewProduct]=useState(init);


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (selectedOptions.includes(value) === false)
        setSelectedOptions([...selectedOptions, value]);
    } else setSelectedOptions(selectedOptions.filter((item) => item !== value));

    console.log(selectedOptions);
  };
  const handleRadioChange=(e)=>{
      
  setNewProduct({ ...newProduct, gender: e.target.value }); 
};

  

  const handleChange=e=>{
    setNewProduct({...newProduct,[e.target.name]:e.target.value})
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const data={...newProduct,sizes:selectedOptions};
    console.log(data);
    setNewProduct(init)
    try
    {
      await axios.post(`http://localhost:3031/items`,data);
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
      value={newProduct.name}
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
      value={newProduct.price}
      required
      min="1"
    />
  </div>

  <div className="mb-3">
    {<div className="mb-3">
  {
  ["Men", "Women", "Unisex"].map((ele, index) => (
    <div key={index} className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="gender"
        value={ele}
        onChange={handleRadioChange}
        checked={newProduct.gender === ele}
        id={`radio-${ele}`}
      />
      <label className="form-check-label" htmlFor={`radio-${ele}`}>
        {ele}
      </label>
    </div>
  ))}
</div>

    }
  </div>

  <div className="mb-3">
    <input
      className="form-control"
      type="text"
      name="color"
      placeholder="Enter the color name of the product"
      onChange={handleChange}
      value={newProduct.color}
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
      value={newProduct.image}
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
      value={newProduct.description}
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
      value={newProduct.stock}
      required
      min="1"
    />
  </div>

  <button type="submit" className="btn btn-primary">
    Add the product
  </button>
</form>

    </div>
  );
}

export default NewProduct;
