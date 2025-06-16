import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [input, setInput] = useState({ name: "", password: "" });
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: input.name,
      pass: input.password,
    };

    let products = await axios.get(`http://localhost:3031/users`);
    products = products.data;

    const matchItem = products.find(
      (item) => data.name === item.name && data.pass === item.password
      
    );

    console.log(matchItem);

    if (matchItem === undefined) setHide(false);
    else {
      setHide(true);
      localStorage.setItem("userName", matchItem.id);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <form className="mx-auto p-4 border rounded shadow-sm" onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Login</h2>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter username"
            value={input.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={input.password}
            onChange={handleChange}
            required
          />
        </div>

        {!hide && (
          <div className="alert alert-danger py-2" role="alert">
            Invalid username or password.{" "}
            <Link to="/signup" className="alert-link">
              Don't have an account? Click to register.
            </Link>
          </div>
        )}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
