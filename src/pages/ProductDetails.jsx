import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext1";

function ProductDetails() {
  const {themeStyle}=useContext(ThemeContext);
  const [product, setproduct] = useState({});
  const [hide, setHide] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const user = localStorage.getItem("userName");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let product = await axios.get(`http://localhost:3031/items/${id}`);
        setproduct(product.data);
      } catch (e) {
        console.log("Failed to fetch:", e);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      navigate("/cartloginalert");
    } else {
      try {
        let userslist = await axios.get(`http://localhost:3031/users/${user}`);
        userslist = userslist.data.cart;
        if (!userslist.includes(id)) {
          userslist = [...userslist, id];
          await axios.patch(`http://localhost:3031/users/${user}`, {
            cart: userslist,
          });
          setHide(false);
          setTimeout(() => {
            setHide(true);
            navigate("/collection");
          }, 1000);
        } else alert("already on cart");
      } catch (e) {
        console.log("failed in fetching users", e);
      }
    }
  };


  return (
    <div className="container mt-5" style={themeStyle}>
      <div className="card mb-4 shadow-sm p-4" style={themeStyle}>
        <div className="row g-4 align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <h4 className="text-primary mb-3">₹{product.price}</h4>
            <div className="d-flex gap-3 mt-4">
              <div className="d-flex flex-column align-items-center gap-3 p-3">
                <button
                  className="btn btn-success px-4 py-2 fw-semibold shadow"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                <div
                  className={`text-success fw-medium ${hide ? "d-none" : ""}`}
                  style={themeStyle}
                >
                  Added to the cart
                </div>

                <button
                  className="btn btn-secondary px-4 py-2 fw-semibold shadow"
                  onClick={() => navigate("/collection")}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
