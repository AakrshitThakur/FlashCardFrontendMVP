import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if the user is logged in

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex sm:flex-row sm:justify-between sm:items-center">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-white text-xl font-bold">
          FlashCardMVP
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex sm:flex-row text-xs sm:text-sm md:text-md lg:text-lg space-x-2 md:space-x-4">
          <Link
            to="/flashcards"
            className="text-white text-left hover:text-gray-200 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/add-flashcard"
            className="text-white text-left hover:text-gray-200 transition-colors"
          >
            Add Flashcard
          </Link>

          {/* Conditionally render Login/Register or Logout */}
          {token ? (
            <button
              onClick={handleLogout}
              className="text-white text-left hover:text-gray-200 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-left hover:text-gray-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-left hover:text-gray-200 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
