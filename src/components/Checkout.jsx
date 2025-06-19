import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemidContext from './Context';
import axios from 'axios';

function Checkout() {
  const [hide,setHide]=useState(true);
  const navigate=useNavigate();
  const location = useLocation();
  const { item } = location.state || {};
  const {user}=useContext(ItemidContext);
  const handleOrder=async (e)=>{
    e.preventDefault();
    let res=await axios.get(`http://localhost:3031/users/${user}`);
    let orders=res.data.orders;
    orders=[...orders,item.id]
    await axios.patch(`http://localhost:3031/users/${user}`,{orders});
    console.log(orders);
    setHide(false);
    let cart=res.data.cart;
    console.log("cart",cart);
    cart=cart.filter(ele=>ele!=item.id);
    console.log("cart2",cart);
    await axios.patch(`http://localhost:3031/users/${user}`,{cart})
    
    setTimeout(()=>{
      navigate("cart");
    },2000)
    
    
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Checkout</h2>
        <p className="fs-5 text-primary">{item?.name}</p>
        <p className="text-muted fs-6">₹{item?.price}</p>
      </div>

      <form
        className="p-4 border rounded shadow-sm bg-light w-100"
        style={{ maxWidth: '500px', margin: 'auto' }}
      >
        <select className="form-select mb-3">
          <option>Cash on delivery</option>
          <option>Pre pay</option>
        </select>

        <legend className="mb-3 fs-5 fw-semibold text-dark">Delivery address</legend>

        <div className="mb-3">
          <input type="text" className="form-control mb-2" placeholder="Enter home name" />
          <input type="text" className="form-control mb-2" placeholder="Enter place" />
          <input type="text" className="form-control" placeholder="Enter pin" />
        </div>
        
        {
          !hide &&  <div className='alert warning text-center ' role="alert">
          Palced Your order ,Check orders for details
        </div>
        }

        <button type="submit" className="btn btn-success w-100" onClick={handleOrder}>Place your order</button>
       
      </form>
    </div>
  );
}

export default Checkout;
