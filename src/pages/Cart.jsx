import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import UserContext from '../components/Context';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const user = localStorage.getItem("userName");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:3031/users/${user}`);
        const userCart = userRes.data.cart;

        const itemRes = await axios.get(`http://localhost:3031/items`);
        const items = itemRes.data;

        const cartItem = items.filter(item => userCart.includes(item.id));
        setCartItems(cartItem);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛒 Your Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          Your cart is empty 😕
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {cartItems.map(item => (
            <div className="col" key={item.id}>
                <CartItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
