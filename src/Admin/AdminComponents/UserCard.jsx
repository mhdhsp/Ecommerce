import axios from 'axios'
import React from 'react'

function UserCard({item}) {

    const removeUser=()=>{
        axios.delete(`http://localhost:3031/users/${item.id}`);
    };

    const blockUser=()=>{

        let value=!item.block;
        axios.patch(`http://localhost:3031/users/${item.id}`,{block:value})
    }


  return (
    <div className="col-md-4 mb-4" >
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><strong>Email:</strong> {item.email}</p>
                <p className="card-text"><strong>Password:</strong> {item.password}</p>
                <p className="card-text"><strong>Items in cart:</strong> {item.cart.length}</p>
                <p className="card-text"><strong>Number of orders:</strong> {item.orders.length}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary btn-sm" onClick={blockUser}>Block</button>
                <button className="btn btn-warning btn-sm" onClick={removeUser}>Remove</button>
              </div>
            </div>
          </div>
  )
}

export default UserCard