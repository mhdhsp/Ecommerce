import React, { useState, useEffect } from 'react';
import ItemidContext from '../components/Context';
import axios from 'axios';

function Orders() {
  const user = localStorage.getItem("userName");
  const [items, setItems] = useState([]);
  // const user=localStorage.getIto
  // oem("userName");
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`http://localhost:3031/users/${user}`);
      let orderDetails = res.data.orders;
      console.log(orderDetails);
      setItems(orderDetails);
    };
    fetchData();
  }, [user]);

  return (
    <div className="container mt-4">
      {
        // !user ? <
        items.length===0? <div  className="alert alert-warning text-center" role="alert">No orders yet</div> :
        items.map(item => (
        <div className="card mb-4 w-100 shadow-sm border-primary" key={item.orderid}>
          <div className="card-body text-dark">
            <p className="mb-1"><span className="fw-semibold">Order Id:</span> {item.orderId}</p>
            <h5 className="card-title text-primary fw-bold">{item.pName}</h5>
            <h6 className="card-subtitle mb-3 text-success ">Size : {item.size}</h6>
            <h6 className="card-subtitle text-secondary fw-bold">Quantity ordered:{item.quantity}</h6>
            <p className="mb-1"><span className="fw-semibold">Address:</span> {item.home}, {item.place}, {item.pin}</p>
            <p className="mb-1"><span className="fw-semibold">Contact:</span> {item.contact}</p>
            <p className="mb-0 text-muted"><span className="fw-bold">Order time:</span> {new Date(item.orderTime).toLocaleString()}</p>
          </div>
        </div>
      ))
      }
    </div>
  );
}

export default Orders;
