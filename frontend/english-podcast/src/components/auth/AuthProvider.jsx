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
    localStorage.setItem("email", decodedUser.sub);
    localStorage.setItem("name", decodedUser.name);
    localStorage.setItem("avatar", decodedUser.avatar);
    localStorage.setItem("roles", decodedUser.roles);
    localStorage.setItem("token", token); 
    setUser(decodedUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    localStorage.removeItem("roles");
    localStorage.removeItem("token");
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