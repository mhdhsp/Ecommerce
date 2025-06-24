import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let res = await axios.get(`http://localhost:3031/users`);
      setUsers(res.data);
    };
    fetchUsers();
  }, []); 

  return (
    <div className="container">
      <h2 className="my-4">User List</h2>
      <div className="row">
        {users.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><strong>Email:</strong> {item.email}</p>
                <p className="card-text"><strong>Password:</strong> {item.password}</p>
                <p className="card-text"><strong>Items in cart:</strong> {item.cart.length}</p>
                <p className="card-text"><strong>Number of orders:</strong> {item.orders.length}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary btn-sm">Block</button>
                <button className="btn btn-warning btn-sm">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
