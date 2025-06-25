import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";

function Collection() {
  const [items, setItems] = useState([]);
  const [allitems, setAllitems] = useState([]);
  const [filters, setFilters] = useState({
    men: false,
    women: false,
    unisex: false,
  });
  useEffect(() => {
    axios.get(`http://localhost:3031/items`).then((res) => {
      
      setAllitems(res.data.filter(item=>item.suspend !==true));
    });
  }, [filters]);

  useEffect(() => {
    setItems(allitems);
  }, [allitems]);

  useEffect(() => {
    const filterData = async () => {
      let activeFilter = Object.keys(filters).filter(
        (element) => filters[element]
      );
       console.log("🔎 Active Filter:", activeFilter);
    console.log("📦 All Items:", allitems);

      let res = allitems.filter((element) =>
        activeFilter.includes(element.gender.toLowerCase())
      );
       console.log("✅ Filtered Items:", res)
      setItems(res);
      if (activeFilter.length === 0) setItems(allitems);
    };
    filterData();
  }, [allitems, filters]);

  const handleChange = async (e) => {
    const { id, checked } = e.target;
    setFilters({ ...filters, [id]: checked });
  };

  const handleClick = (e) => {
    let action = e.target.value;
    switch (action) {
      case "toLow": {
        let arr = [...items];
        arr = arr.sort((a, b) => b.price - a.price);
        setItems(arr);
        break;
      }
      case "toHigh": {
        let arr = [...items];
        arr = arr.sort((a, b) => a.price - b.price);
        setItems(arr);
        break;
      }
    }
  };
  return (
    <div>
      <Filter handleChange={handleChange} handleClick={handleClick} />
      <div className="container py-4">
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <Link
                to={`/items/${item.id}`}
                className="text-decoration-none text-dark"
              >
                <ItemCard item={item} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
