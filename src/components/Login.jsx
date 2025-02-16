import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Login component responsible for handling user authentication
const Login = () => {
  // State variables to store user input for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Hook from react-router-dom for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Sending a POST request to the server with the entered username and password
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // Storing the received authentication token in local storage for session management
      localStorage.setItem("token", res.data.token);

      // Navigate to the flashcards page after successful login
      navigate("/flashcards");
    } catch (err) {
      // Log any errors that occur during login
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Login form container with styling */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>

        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-2 w-full border rounded"
        />

        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 w-full border rounded"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
