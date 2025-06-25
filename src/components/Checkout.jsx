import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ItemidContext from "./Context";
import axios from "axios";

function Checkout() {
  const [hide, setHide] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    paymentMethod: "",
    size: "",
    home: "",
    place: "",
    pin: "",
    contact: "",
    quantity: 1,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};
  const { user } = useContext(ItemidContext);

  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  console.log(orderDetails);

  const handleOrder = async (e) => {
    e.preventDefault();
    let data = {
      ...orderDetails,
      pName: item.name,
      orderTime: new Date(),
      orderId: Math.floor(Math.random() * 10000) + 1,
      price:orderDetails.quantity*item.price
    };
    console.log("from checkout",user);
    
    let res = await axios.get(`http://localhost:3031/users/${user}`);
    let orders = res.data.orders;
    orders = [...orders, data];
    await axios.patch(`http://localhost:3031/users/${user}`, { orders });
    console.log(orders);
    setHide(false);
    let cart = res.data.cart;
    console.log("cart", cart);
    cart = cart.filter((ele) => ele != item.id);
    console.log("cart2", cart);
    await axios.patch(`http://localhost:3031/users/${user}`, { cart });

    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  const setQuantity = (type) => {
  setOrderDetails(prev => ({
    ...prev,
    quantity:
      type === "increment"
        ? prev.quantity + 1
        : prev.quantity > 0
        ? prev.quantity - 1
        : 0
  }));
};


  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Checkout</h2>
        <p className="fs-5 text-primary">{item?.name}</p>
        <p className="text-muted fs-6">₹{item?.price}</p>
      </div>

      <form
        className="p-4 border rounded shadow-sm bg-light w-100"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <select
          className="form-select mb-3"
          name="paymentMethod"
          onChange={handleChange}
        >
          <option value="" disabled selected>
            Select a payment method
          </option>
          <option value="Cash on delivery">Cash on delivery</option>
          <option value="Online payment">Online payment</option>
        </select>

        <select
          className="form-select mb-3"
          name="size"
          onChange={handleChange}
        >
          <option value="" disabled selected>
            Select the size
          </option>
          <option value={item.sizes[0]}>{item.sizes[0]}</option>
          <option value={item.sizes[1]}>{item.sizes[1]}</option>
          <option value={item.sizes[2]}>{item.sizes[2]}</option>
        </select>

        <div className="d-flex align-items-center gap-3 mt-3">
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>setQuantity("decrement")}>-</button>
          <span className="fw-bold">{orderDetails.quantity}</span>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>setQuantity("increment")}>+</button>
          <span className="ms-4 text-success fw-semibold">
            Amount to be paid: ₹{item.price * orderDetails.quantity}
          </span>
        </div>

        <legend className="mb-3 fs-5 fw-semibold text-dark">
          Delivery address
        </legend>

        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter home name"
            name="home"
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter place"
            name="place"
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter pin"
            name="pin"
            onChange={handleChange}
          />
          <input
            type="contact"
            className="form-control"
            placeholder="Enter contact nuber"
            name="contact"
            onChange={handleChange}
          />
        </div>

        {!hide && (
          <div className="alert warning text-center " role="alert">
            Palced Your order ,Check orders for details
          </div>
        )}

        <button
          type="submit"
          className="btn btn-success w-100"
          onClick={handleOrder}
        >
          Place your order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
