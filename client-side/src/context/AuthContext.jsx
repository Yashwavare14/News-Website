// UserContext.js
import React, { createContext, useState, useEffect } from "react";

// Create a UserContext
export const AuthContext = createContext();

// UserProvider component to provide user state to the app
const AuthProvider = ({ children }) => {
  //const username = localStorage.getItem("loggedInUser");
  const [user, setUser] = useState("");

  // Sync the user state with localStorage
  const updateUser = () => {
    setUser(localStorage.getItem("loggedInUser") || "");
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
