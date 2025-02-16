import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

/**
 * Register Component
 * This component provides a user registration form with username and password fields.
 * Upon successful registration, the user is redirected to the flashcards page.
 */
const Register = () => {
  // State hooks to manage input field values
  const [username, setUsername] = useState(""); // Stores the username input
  const [password, setPassword] = useState(""); // Stores the password input

  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  /**
   * Handles form submission by sending a POST request to the registration API.
   * If successful, stores the authentication token and redirects the user.
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the backend with username and password
      const res = await axios.post("https://flashcardbackendmvp.onrender.com/register", {
        username,
        password,
      });

      // Store the received authentication token in local storage
      localStorage.setItem("token", res.data.token);

      // Navigate to the flashcards page upon successful registration
      navigate("/flashcards");
    } catch (err) {
      // Log any errors that occur during registration
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <em className="text-xs">
          You can log in using the username 'demo' and the password 'demo' to
          test this MVP.
        </em>
        <h2 className="text-2xl mb-4">Register</h2>

        {/* Username Input Field */}
        <input
          type="text"
          placeholder="Username"
          value={username} // Controlled component - value is bound to state
          onChange={(e) => setUsername(e.target.value)} // Update state on input change
          className="mb-4 p-2 w-full border rounded"
        />

        {/* Password Input Field */}
        <input
          type="password"
          placeholder="Password"
          value={password} // Controlled component - value is bound to state
          onChange={(e) => setPassword(e.target.value)} // Update state on input change
          className="mb-4 p-2 w-full border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register; // Export the Register component for use in other parts of the app
