import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext1';

function Orders() {
  const user = localStorage.getItem("userName");
  const [items, setItems] = useState([]);
  const {themeStyle}=useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3031/users/${user}`);
        const orderDetails = res.data.orders;
        console.log(orderDetails);
        setItems(orderDetails);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-4 text-center" style={themeStyle}>
        <div className="alert alert-info" style={themeStyle}>Please <Link to="/login">login</Link> to view your orders.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📦 Your Orders</h2>

      {items.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          No orders yet 😕
        </div>
      ) : (
        items.map(item => (
          <div className="card mb-4 w-100 shadow-sm border-primary" key={item.orderId}>
            <div className="card-body text-dark">
              <p className="mb-1">
                <span className="fw-semibold">Order Id:</span> {item.orderId}
              </p>
              <h5 className="card-title text-primary fw-bold">{item.pName}</h5>
              <h6 className="card-subtitle mb-3 text-success">Size: {item.size}</h6>
              <h6 className="card-subtitle text-secondary fw-bold">
                Quantity ordered: {item.quantity}
              </h6>
              <p className="mb-1">
                <span className="fw-semibold">Address:</span> {item.home}, {item.place}, {item.pin}
              </p>
              <p className="mb-1">
                <span className="fw-semibold">Contact:</span> {item.contact}
              </p>
              <p className="mb-0 text-muted">
                <span className="fw-bold">Order time:</span>{' '}
                {new Date(item.orderTime).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
