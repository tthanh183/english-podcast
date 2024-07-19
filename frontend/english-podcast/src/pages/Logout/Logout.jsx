import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    toast.success("Logout successfully!");
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
