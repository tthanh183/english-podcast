import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Avatar } from "@material-tailwind/react";

const Header = () => {
  const { user, handleLogout, isAuthenticated } = useAuth();

  return (
    <div className="p-3 bg-black flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <h1 className="text-[40px] uppercase font-bold text-red-900">
          Podcast
        </h1>
        <nav className="flex items-center space-x-8">
          <Link to="/" className="text-white font-sans text-lg">
            Home
          </Link>
          <Link to="/about" className="text-white font-sans text-lg">
            About
          </Link>
          <Link to="/contact" className="text-white font-sans text-lg">
            Contact
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              withBorder={true}
              className="p-0.5"
            />
            <button
              onClick={handleLogout}
              className="p-2 text-white bg-red-700 hover:bg-red-900 font-sans text-lg rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="p-2 text-white bg-red-700 hover:bg-red-900 font-sans text-lg rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
