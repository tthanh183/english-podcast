import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
