import "./App.css"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { useContext, useState,useEffect } from "react";
import AppRoutes from "./components/AppRoutes"
import { ThemeContext } from "./components/ThemeContext1";
function App() {
  const [user, setUser] = useState("");
  const [itemId, setItemId] = useState("");
  const {bodyStyle,themeStyle}=useContext(ThemeContext);

  useEffect(() => {
    if (bodyStyle) {
      Object.entries(bodyStyle).forEach(([key, value]) => {
        document.body.style[key] = value;
      });
    }

    // Optional: Cleanup styles on unmount or when theme changes
    return () => {
      document.body.removeAttribute("style");
    };
  }, [bodyStyle]);

  return (
    <Router>
     <div style={themeStyle} className="h-100">
       <AppRoutes
        user={user}
        setUser={setUser}
        itemId={itemId}
        setItemId={setItemId}
      />
     </div>
    </Router>
  );
}

export default App;