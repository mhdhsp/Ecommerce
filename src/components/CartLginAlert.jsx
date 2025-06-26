import React from 'react';
import Login from "../pages/Login";


function CartLginAlert() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
      <div className="alert alert-warning text-center w-100" role="alert">
        <h4 className="mb-3">Oops! Please login to access your cart.</h4>
      </div>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Login />
      </div>
    </div>
  );
}

export default CartLginAlert;
