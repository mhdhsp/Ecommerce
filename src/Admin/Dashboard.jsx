import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../components/Card.css"
import Graph from './AdminComponents/Graph';

function Dashboard() {

  const [users, setUsers] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [productsCount, setProductsCount] = useState([]);
  const [avilableProducts,setAvailableProducts]=useState([])
  const [totalRevenue,setTotalRevenue]=useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      let res = await axios.get(`http://localhost:3031/users`);
      setUsers(res.data);
      const orderCount = res.data.reduce((sum, item) => {
        return sum + item.orders.length;
      }, 0);

      setTotalOrders(orderCount);

      const total = res.data.reduce((sum, item) => {
  return sum + item.orders.reduce((orderSum, order) => orderSum + order.price, 0);
}, 0);

setTotalRevenue(total);


console.log(total);

      

      let pdt = await axios.get(`http://localhost:3031/items`);
      setProductsCount(pdt.data.length);
      setAvailableProducts(pdt.data.filter(item=>item.suspend!==true));

    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      
      
      <Graph users={users.length} products={productsCount} 
            avilableProducts={avilableProducts.length} orders={totalOrders}
            revenue={totalRevenue}/>
    </div>
  )
}

export default Dashboard;
