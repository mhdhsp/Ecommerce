import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate(0); 
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="container-fluid">
    
      <div
        className="bg-dark text-white p-3 position-fixed vh-100"
        style={{ width: "220px", zIndex: 1000 }}
      >
        <h4 className="text-center mb-4">Admin Panel</h4>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <NavLink
              to="analysis"
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active bg-secondary' : 'text-white'}`
              }
            >
              Analysis
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="products"
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active bg-secondary' : 'text-white'}`
              }
            >
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="users"
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active bg-secondary' : 'text-white'}`
              }
            >
              Users
            </NavLink>
          </li>
          <li className="nav-item mt-auto">
            <button
              className="btn btn-outline-light w-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div 
        className="ms-auto bg-light" 
        style={{ 
          marginLeft: "220px", 
          minHeight: "100vh",
          padding: "1rem" ,
          paddingLeft:"15rem"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Home;