import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Admin/AdminComponents/Modal";
import { useState } from "react";
import "./Card.css";
import { ThemeContext } from "./ThemeContext1";
function Navbar() {
  const user = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const {theme,toggleTheme}=useContext(ThemeContext);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    localStorage.clear();
    navigate("/login");
  };

 

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        theme === "dark" ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-primary fw-bold" to="/">
          TEEXO
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex justify-content-center">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/collection">
                Collection
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/cart">
                Cart
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/orders">
                Orders
              </Link>
            </li>

            <li className="nav-item d-flex align-items-center px-2 text-muted">
              <button
                className="btn btn-sm btn-outline-dark"
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}

            {user && (
              <li className="nav-item">
                <button className="btn btn-primary ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
            <Modal
              show={showModal}
              onConfirm={handleConfirm}
              onCancel={() => setShowModal(false)}
              message={"Are you sure to logout ?"}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
