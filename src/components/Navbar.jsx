import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Admin/AdminComponents/Modal';
import { useState } from 'react';
function Navbar() {
  const user = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [showModal,setShowModal]=useState(false);


  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirm=()=>{
    setShowModal(false);
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand text-primary fw-bold" to="/">TEEXO</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/collection">Collection</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/cart">Cart</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/orders">Orders</Link>
            </li>

            {
              !user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/signup">Signup</Link>
                  </li>
                </>
              )
            }

            {
              user && (
                <li className="nav-item">
                  <button className="btn btn-primary ms-2" onClick={handleLogout}>Logout</button>
                </li>
                
              )
            }
            <Modal show={showModal}
              onConfirm={handleConfirm}
              onCancel={()=>setShowModal(false)}
              message={"Are you sure to logout ?"}/>
          </ul>
        </div>
      </div>
      
    </nav>
  );
}

export default Navbar;
