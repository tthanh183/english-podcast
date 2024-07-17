import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleLogin(token);
    }
  }, []);

  const handleLogin = (token) => {
    const decodedUser = jwtDecode(token);
    localStorage.setItem("email", decodedUser.email);
    localStorage.setItem("name", decodedUser.name);
    localStorage.setItem("token", token); 
    localStorage.setItem("avatar", decodedUser.avatar);
    setUser(decodedUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};