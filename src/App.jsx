import "./App.css"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Collection from "./pages/Collection"
import Cart from "./pages/Cart"
import Signup from "./pages/Signup"
import ProductDetails from "./pages/ProductDetails"
import CartLginAlert from "./components/CartLginAlert"
import ItemidContext from "./components/Context"
import {   useEffect, useState } from "react"
import Checkout from "./components/Checkout"
import Orders from "./pages/Orders"

function App() {
const [user,setUser]=useState("");
  const [itemId,setItemId]=useState("");
 useEffect(()=>{setUser(localStorage.getItem("userName"))},[])
  return (
  <>
    <ItemidContext.Provider value={{itemId,setItemId,user}}>
      <Router>
        <Navbar/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Collection/>}/>
            <Route path="/collection" element={<Collection/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login/signup" element={<Signup/>}/>
            <Route path="/items/:id" element={<ProductDetails/>}/>
            <Route path="/cartloginalert" element={<CartLginAlert/>}/>
            <Route path="/cart/checkout" element={<Checkout/>}/>
            <Route path="/cart/checkout/cart" element={<Cart/>}/>
         </Routes>
      </Router>
      </ItemidContext.Provider>
  </>
  )
}

export default App
