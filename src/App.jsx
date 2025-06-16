import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Collection from "./pages/Collection"
import Cart from "./pages/Cart"
import Signup from "./pages/Signup"
import ProductDetails from "./pages/ProductDetails"
import CartLginAlert from "./components/CartLginAlert"

function App() {

  return (
  <>
    
      <Router>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/collection" element={<Collection/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login/signup" element={<Signup/>}/>
            <Route path="/items/:id" element={<ProductDetails/>}/>
            <Route path="/cartloginalert" element={<CartLginAlert/>}/>
         </Routes>
      </Router>
    
  </>
  )
}

export default App
