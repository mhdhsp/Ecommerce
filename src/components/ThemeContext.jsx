import React,{ useState, useEffect } from 'react';


import { ThemeContext } from "./ThemeContext1";

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const themeStyle={
      backgroundColor: theme === "dark" ? "#1e1e1e" : "#f8f9fa", 
    color: theme === "dark" ? "#ffffff" : "#000000",
  };

 

  const inputStyle = {
    minWidth: "200px",
    backgroundColor: theme === "dark" ? "beige" : "#ffffff",
    color: theme === "dark" ? "black" : "#000000",
    borderColor: theme === "dark" ? "#444" : "#ced4da",
  };

  const selectStyle = {
    backgroundColor: theme === "dark" ? "#2a2a2a" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#000000",
    borderColor: theme === "dark" ? "#444" : "#ced4da",
  };

  const bodyStyle={
      backgroundColor: theme === "dark" ? "#1e1e1e" : "white", 
    color: theme === "dark" ? "#ffffff" : "#000000",
  };

  


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme,themeStyle,inputStyle,selectStyle}}>
      {children}
    </ThemeContext.Provider>
  );
}
