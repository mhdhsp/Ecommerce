import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../components/Card.css"

function Analysis() {

  const [users, setUsers] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [productsCount, setProductsCount] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let res = await axios.get(`http://localhost:3031/users`);
      setUsers(res.data);
      const orderCount = res.data.reduce((sum, item) => {
        return sum + item.orders.length;
      }, 0);
      setTotalOrders(orderCount);

      let pdt = await axios.get(`http://localhost:3031/items`);
      setProductsCount(pdt.data.length);

    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-3 mb-4 ">
          <div className="card shadow-sm border-primary hover-card">
            <div className="card-body">
              <h5 className="card-title text-primary">Total Users</h5>
              <p className="card-text display-6">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-success hover-card">
            <div className="card-body">
              <h5 className="card-title text-success">Total Orders</h5>
              <p className="card-text display-6">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-warning hover-card">
            <div className="card-body">
              <h5 className="card-title text-warning">Total Products</h5>
              <p className="card-text display-6">{productsCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis;
