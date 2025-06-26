import React, { useContext, useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import { ThemeContext } from "../components/ThemeContext1";

function Collection() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const {themeStyle}=useContext(ThemeContext);

  useEffect(() => {
    axios.get(`http://localhost:3031/items`).then((res) => {
      const activeItems = res.data.filter(item => item.suspend !== true);
      setAllItems(activeItems);
      setItems(activeItems);
    });
  }, []);

  const handleButtonClick=(e)=>{
    if(e.target.value==="All items")
      setItems(allItems);
    else
    {
      let filtered=allItems.filter(item=>item.gender.toLowerCase()===e.target.value.toLowerCase());
       setItems(filtered);
    }
    
  }

  const handleClick = (e) => {
    const action = e.target.value;
    let sortedItems = [...items];

    switch (action) {
      case "highToLow":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "lowToHigh":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "reset":
        sortedItems = [...allItems];
        break;
      default:
        return;
    }

    setItems(sortedItems);
  };

  const handleSearchChange=(e)=>{
    console.log(e.target.value);
    let match=allItems.filter(item=>item.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
    setItems(match);
    
  }

  return (
    <div style={themeStyle}>
      <Filter handleClick={handleClick} handleButtonClick={handleButtonClick} handleSearchChange={handleSearchChange} />
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
