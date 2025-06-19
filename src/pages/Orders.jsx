import React, { useState, useContext, useEffect } from 'react';
import ItemidContext from '../components/Context';
import axios from 'axios';

function Orders() {
  const user = localStorage.getItem("userName");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`http://localhost:3031/users/${user}`);
      let orderId = res.data.orders;

      res = await axios.get(`http://localhost:3031/items`);
      let orderedItems = res.data;
      orderedItems = orderedItems.filter(item => orderId.includes(item.id));
      setItems(orderedItems);
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {items.map(item => (
        <div className="card mb-3 w-100 bg-light border-primary" key={item.id}>
          <div className="card-body text-dark">
            <h5 className="card-title text-primary">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-success">₹{item.price}</h6>
            <p className="card-text"><strong>Color:</strong> <span className="text-info">{item.color}</span></p>
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
