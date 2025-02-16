import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditFlashcard = () => {
  const { id } = useParams(); // Get the flashcard ID from the URL
  const navigate = useNavigate();

  // State to store the flashcard details
  const [flashcard, setFlashcard] = useState({
    question: '',
    answer: '',
  });

  // Fetch the flashcard details when the component mounts
  useEffect(() => {
    const fetchFlashcard = async () => {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage
      try {
        const res = await axios.get(`http://localhost:5000/flashcards/${id}`, {
          headers: { 'x-auth-token': token }, // Include the token in the request headers
        });
        console.log(res.data);
        setFlashcard(res.data); // Set the flashcard state with the fetched data
      } catch (err) {
        console.error(err); // Log any errors to the console
      }
    };
    fetchFlashcard(); // Call the fetchFlashcard function
  }, [id]); // Re-run the effect if the ID changes

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlashcard((prev) => ({
      ...prev,
      [name]: value, // Update the specific field (question or answer)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the JWT token from local storage
    try {
      // Send a PUT request to update the flashcard
      await axios.put(
        `http://localhost:5000/flashcards/${id}`,
        { question: flashcard.question, answer: flashcard.answer }, // Updated data
        {
          headers: { 'x-auth-token': token }, // Include the token in the request headers
        }
      );
      alert('Flashcard updated successfully!');
      navigate('/flashcards'); // Redirect to the flashcards list after updating
    } catch (err) {
      console.error(err); // Log any errors to the console
      alert('Failed to update flashcard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Edit Flashcard</h2>

        {/* Question Input */}
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={flashcard.question}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        {/* Answer Input */}
        <div className="mb-4">
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={flashcard.answer}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditFlashcard;