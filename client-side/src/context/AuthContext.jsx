// UserContext.js
import React, { createContext, useState, useEffect } from "react";

// Create a UserContext
export const AuthContext = createContext();

// UserProvider component to provide user state to the app
const AuthProvider = ({ children }) => {
  //const username = localStorage.getItem("loggedInUser");
  const [user, setUser] = useState(localStorage.getItem("loggedInUser") || "");

  // Sync the user state with localStorage
  const updateUser = () => {
    setUser(localStorage.getItem("loggedInUser") || "");
  };

  useEffect(() => {
    const handleStorageChange = () => updateUser();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
