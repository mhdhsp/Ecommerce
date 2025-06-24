import "./App.css"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { useState } from "react";
import AppRoutes from "./components/AppRoutes"
function App() {
  const [user, setUser] = useState("");
  const [itemId, setItemId] = useState("");

  return (
    <Router>
      <AppRoutes
        user={user}
        setUser={setUser}
        itemId={itemId}
        setItemId={setItemId}
      />
    </Router>
  );
}

export default App;