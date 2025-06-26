import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { ThemeContext } from '../components/ThemeContext1';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const user = localStorage.getItem("userName");
  const {themeStyle}=useContext(ThemeContext);
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

    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <div className="container-fluid mt-5 " style={themeStyle}>
      {user ? (
        <>
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
        </>
      ) : (
        <div className="alert alert-info text-center" style={themeStyle}>
          Please <Link to="/login">login</Link> to view your cart.
        </div>
      )}
    </div>
  );
}

export default Cart;
