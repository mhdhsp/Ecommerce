// LandingPage.js
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext1";

function LandingPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {theme,themeStyle}=useContext(ThemeContext);

  useEffect(() => {
    const fethData = async () => {
      let res = await axios.get(`http://localhost:3031/items?_limit=3`);
      res = res.data;
      setData(res);
    };
    fethData();
  },[]);
  

  return (
    <div className={theme==="dark"?"bg-secondary":"bg-light"}>
      {/* Hero Section */}
      <section className={` text-center py-5 `}  style={themeStyle}>
        <div className="container">
          <h1 className="display-4 fw-bold">Shop the Latest Trends</h1>
          <p className="lead mb-4">
            Discover amazing deals on fashion, electronics, and more.
          </p>
          <Link to="collection" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-5 " style={themeStyle}>
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row">
            {data.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div
                  className="card shadow-sm border-0 text-white"
                  style={{
                    height: "250px",
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "0.75rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="card-body d-flex flex-column justify-content-end"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: "1rem",
                    }}
                  >
                    <h6 className="card-title mb-1">{item.name}</h6>
                    <p className="card-text text-light small">
                      Rs: {item.price}
                    </p>
                    <button
                      className="btn btn-sm btn-outline-light mt-2 align-self-start"
                      onClick={() => navigate(`/items/${item.id}`)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-5 " style={themeStyle}>
        <div className="container">
          <h2 className="text-center mb-4">Shop by Category</h2>
          <div className="row text-center">
            {["Men", "Women", "Unisex","Sports"].map((category) => (
              <div className="col-6 col-md-3 mb-3" key={category}>
                <div className="p-4  border rounded shadow-sm h-100" style={themeStyle}>
                  <h5>{category}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 " style={themeStyle}>
        <div className="container text-center">
          <h2 className="mb-4">What Our Customers Say</h2>
          <blockquote className="blockquote">
            <p className="mb-0">
              "Excellent quality and service. Highly recommend!"
            </p>
            <footer className="blockquote-footer mt-2">
              Ayesha from Mumbai
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section
  className="py-5 text-white text-center"
  style={{
    backgroundColor: theme === "light" ? "#0d6efd" : "#1e1e1e", // primary blue for light, dark gray for dark
    color: theme === "light" ? "#ffffff" : "#ffffff",
  }}
>
  <div className="container">
    <h2 className="mb-3">Get Started Today</h2>
    <Link to="/collection" className="btn btn-light btn-lg">
      Browse Products
    </Link>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <small>
            &copy; {new Date().getFullYear()} ShopNow. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
