import React, { useContext, useEffect, useState } from "react";
import UserContext from "./Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";

function CartItem({ item }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [hide,setHide]=useState(true);
  const navigate=useNavigate();

  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`http://localhost:3031/users/${user}`);
      setCart(res.data.cart);
    };
    fetchData();
  }, [user, cart]);

  const removeFromCart = async () => {
    let cartItems = cart.filter((value) => value !== item.id);
    console.log(cartItems);

    setCart(cartItems);
    axios.patch(`http://localhost:3031/users/${user}`, { cart: cartItems });

    // setRefresh(!refresh);
    navigate(0);
  };

  const buyNow=async ()=>{
    setHide(false);
  }

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={item.image}
        alt={item.name}
        className="card-img-top img-fluid"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{item.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">₹{item.price}</h6>
        <p className="card-text small">{item.description}</p>
        <div className="mt-auto d-flex justify-content-between">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={removeFromCart}
          >
            Remove From cart
          </button>
          <button className="btn btn-success btn-sm" onClick={buyNow}>Buy Now</button>
        </div>
      </div>
      {
        hide ? "":<Checkout/>
      }
    </div>
  );
}

export default CartItem;
