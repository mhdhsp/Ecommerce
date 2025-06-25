import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
const navigate=useNavigate();
  const [hide, setHide] = useState(true);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: input.name,
      email: input.email,
      password: input.password,
      password2: input.password2,
      block:false,
      cart:[],
      orders:[]
    };

    if (data.password === data.password2) {
      setHide(true);
      axios.post(`http://localhost:3031/users`, data)
        .catch(() => console.log("Failed to add user"));
      navigate("/login");
    } else {
      setHide(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="mb-4 text-center">Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter user name"
              value={input.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your Email ID"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter new password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password2"
              className="form-control"
              placeholder="Re-enter password"
              value={input.password2}
              onChange={handleChange}
              required
            />
          </div>

          {!hide && (
            <div className="alert alert-danger p-2 text-center">
              Passwords do not match!
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
