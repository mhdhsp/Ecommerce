import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, NavLink} from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext1";

function Collection() {
  const [allitems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const {themeStyle,theme,inputStyle}=useContext(ThemeContext);

  useEffect(() => {
    const fetchItems = async () => {
      let res = await axios.get(`http://localhost:3031/items`);
      res = res.data;
      setAllItems(res);
      setItems(res);
    };
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setItems(
      allitems.filter((item) => item.name.toLowerCase().startsWith(query))
    );
  };

  const handleSort = (e) => {
    const order = e.target.value;
    if (order === "tolow") {
      setItems([...allitems].sort((a, b) => a.price - b.price));
    } else if (order === "tohigh") {
      setItems([...allitems].sort((a, b) => b.price - a.price));
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light" style={themeStyle}>
      <nav  className={`navbar navbar-expand-lg shadow-sm ${
        theme === "dark" ? "bg-secondary text-white" : "bg-white"
      }`} style={{transition: "1s ease-in"}}>
        <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center" >
          <ul className="navbar-nav flex-row flex-wrap gap-3">
            <li className="nav-item">
              <NavLink
                to="allitems"
                className={({ isActive }) =>
                  `nav-link fw-semibold text-dark ${
                    isActive ? "border-bottom border-4 border-primary" : ""
                  }`
                }
              >
                All Items
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="men"
                className={({ isActive }) =>
                  `nav-link fw-semibold text-dark ${
                    isActive ? "border-bottom border-4 border-primary" : ""
                  }`
                }
              >
                Men
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="women"
                className={({ isActive }) =>
                  `nav-link fw-semibold text-dark ${
                    isActive ? "border-bottom border-4 border-primary" : ""
                  }`
                }
              >
                Women
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="unisex"
                className={({ isActive }) =>
                  `nav-link fw-semibold text-dark ${
                    isActive ? "border-bottom border-4 border-primary" : ""
                  }`
                }
              >
                Unisex
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <input
              type="search"
              className="form-control"
              placeholder="Search by name..."
              onChange={handleSearch}
              style={inputStyle}
            />
            <select
              className="form-select"
              defaultValue=""
              onChange={handleSort}
              style={inputStyle}
            >
              <option value="" disabled>
                Sort by Price
              </option>
              <option value="tolow">Low to High</option>
              <option value="tohigh">High to Low</option>
            </select>
          </div>
        </div>
      </nav>

      <div className="container-fluid flex-grow-1 py-4" style={themeStyle}>
        <Outlet context={items} />
      </div>
    </div>
  );
}

export default Collection;
