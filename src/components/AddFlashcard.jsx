import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// AddFlashcard component allows users to create new flashcards
const AddFlashcard = () => {
  // State hooks to manage input values for the flashcard question and answer
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const token = localStorage.getItem("token"); // Retrieve auth token from localStorage

      // Send POST request to the server to add a new flashcard
      const res = await axios.post(
        "https://flashcardbackendmvp.onrender.com/flashcards", // API endpoint for flashcards
        { question, answer }, // Request body containing the flashcard data
        {
          headers: { "x-auth-token": token }, // Attach token in request headers for authentication
        }
      );

      alert("Flashcard added successfully!"); // Show success message
      navigate("/flashcards"); // Redirect to the flashcards list page
    } catch (err) {
      console.error(err); // Log any errors to the console
      alert("Failed to add flashcard"); // Show error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Form for adding a new flashcard */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Add New Flashcard</h2>

        {/* Input field for the flashcard question */}
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)} // Update question state on input change
          className="mb-4 p-2 w-full border rounded"
          required // Make the field required
        />

        {/* Input field for the flashcard answer */}
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)} // Update answer state on input change
          className="mb-4 p-2 w-full border rounded"
          required // Make the field required
        />

        {/* Submit button to add the flashcard */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default AddFlashcard; // Export the component for use in other parts of the app
