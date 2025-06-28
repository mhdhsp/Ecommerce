import "../App.css";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Login from "../pages/Login";
import Collection from "../pages/Collection";
import Cart from "../pages/Cart";
import Signup from "../pages/Signup";
import ProductDetails from "../pages/ProductDetails";
import CartLginAlert from "../components/CartLginAlert";
import ItemidContext from "../components/Context";
import { useEffect} from "react";
import Checkout from "../components/Checkout";
import Orders from "../pages/Orders";
import Home from "../Admin/Home";
import Products from "../Admin/Products";
import Users from "../Admin/Users";
import NewProduct from "../Admin/NewProduct";
import EditItem from "../Admin/EditItem";
import AdminManage from "../Admin/AdminManage";
import Dashboard from "../Admin/Dashboard";
import UserHome from "../pages/UserHome";
import Men from "./Men"
import Women from "./Women"
import Unisex from "./Unisex"
import AllItems from "./AllItems"

function AppRoutes({ user, setUser, itemId, setItemId }) {

  const location = useLocation();
  const hideNavBar = location.pathname.startsWith("/admin");

  useEffect(() => {
    setUser(localStorage.getItem("userName"));
  }, [setUser]);

  return (
    <ItemidContext.Provider value={{ itemId, setItemId, user }}>
      {!hideNavBar && <Navbar />}
      <Routes>
        <Route path="/admin" element={<Home/>}>
            <Route index element={<Dashboard/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="adminmanage" element={<AdminManage />} />
          <Route path="/admin/products/newproduct" element={<NewProduct/>}/>
          <Route path="/admin/products/editproduct" element={<EditItem/>}/>
        </Route>
        

        <Route path="/" element={<UserHome/>} />
        <Route path="/collection" element={<Collection />}>
            <Route index element={<AllItems/>}/>
            <Route path="allitems" element={<AllItems/>}/>
            <Route path="men" element={<Men/>}/>
            <Route path="women" element={<Women/>}/>
            <Route path="unisex" element={<Unisex/>}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/items/:id" element={<ProductDetails />} />
        <Route path="/cartloginalert" element={<CartLginAlert />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/cart/checkout/cart" element={<Cart />} />
      </Routes>
    </ItemidContext.Provider>
  );
}
export default AppRoutes