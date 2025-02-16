import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Flashcards = () => {
  // State to store the list of flashcards fetched from the backend
  const [flashcards, setFlashcards] = useState([]);

  // State to toggle between showing the question or answer of the current flashcard
  const [showAnswer, setShowAnswer] = useState(false);

  // State to track the index of the currently displayed flashcard
  const [currentCard, setCurrentCard] = useState(0);

  // State to store the number of flashcards due for review today
  const [dueTodayCount, setDueTodayCount] = useState(0);

  // Hook for programmatic navigation (e.g., redirecting to another page)
  const navigate = useNavigate();

  // Fetch flashcards from the backend when the component mounts
  useEffect(() => {
    const fetchFlashcards = async () => {
      const token = localStorage.getItem("token"); // Get the JWT token from local storage
      try {
        // Send a GET request to fetch flashcards for the logged-in user
        const res = await axios.get("https://flashcardbackendmvp.onrender.com/flashcards", {
          headers: { "x-auth-token": token }, // Include the token in the request headers
        });
        setFlashcards(res.data); // Update the flashcards state with the fetched data

        // Calculate the number of flashcards due for review today
        const today = new Date(); // Get the current date
        const dueToday = res.data.filter(
          (card) => new Date(card.nextReviewDate) <= today // Filter flashcards with nextReviewDate <= today
        );
        setDueTodayCount(dueToday.length); // Update the dueTodayCount state
      } catch (err) {
        console.error(err); // Log any errors to the console
      }
    };
    fetchFlashcards(); // Call the fetchFlashcards function
  }, [currentCard]); // Empty dependency array ensures this runs only once when the component mounts

  // Handle user's response (correct or incorrect) for the current flashcard
  const handleAnswer = async (correct) => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage
    try {
      // Send a PUT request to update the flashcard's box level and nextReviewDate
      await axios.put(
        `https://flashcardbackendmvp.onrender.com/flashcards/${flashcards[currentCard]._id}`, // Flashcard ID
        { correct }, // Payload: whether the user answered correctly
        {
          headers: { "x-auth-token": token }, // Include the token in the request headers
        }
      );

      // Move to the next flashcard in the list
      setCurrentCard((prev) => (prev + 1) % flashcards.length); // Use modulo to loop back to the first card
      setShowAnswer(false); // Reset the showAnswer state for the next card
    } catch (err) {
      console.error(err); // Log any errors to the console
    }
  };

  // Toggle between showing the question and answer of the current flashcard
  const flipCard = () => {
    setShowAnswer(!showAnswer); // Invert the showAnswer state
  };

  // If there are no flashcards, display a message
  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">
          No flashcards available. Add some to get started!
        </p>
      </div>
    );
  }

  // Get the currently displayed flashcard
  const currentFlashcard = flashcards[currentCard];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Progress Indicator: Display the number of flashcards due today */}
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold">
          You have {dueTodayCount} flashcards due today.
        </p>
      </div>
      {/* Flashcard: Display the question or answer with a flip animation */}
      <div
        className="w-96 h-64 bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform duration-300 hover:scale-105"
        onClick={flipCard} // Flip the card when clicked
      >
        <div className="flex flex-col justify-between h-full">
          {/* Display the box level and next review date */}
          <div>
            <p className="text-gray-600 text-sm">
              Box {currentFlashcard.box} | Next Review:{" "}
              {new Date(currentFlashcard.nextReviewDate).toLocaleDateString()}
            </p>
          </div>

          {/* Display the question or answer based on the showAnswer state */}
          <div className="text-center">
            {showAnswer ? (
              <p className="text-xl font-semibold">{currentFlashcard.answer}</p>
            ) : (
              <p className="text-xl font-semibold">
                {currentFlashcard.question}
              </p>
            )}
          </div>

          {/* Hint for the user to click the card to flip it */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              {showAnswer
                ? "Click to see the question"
                : "Click to see the answer"}
            </p>
          </div>
        </div>
      </div>
      {/* Buttons for user to indicate if they got the answer right or wrong */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => handleAnswer(true)} // Mark the answer as correct
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors"
        >
          Got it right
        </button>
        <button
          onClick={() => handleAnswer(false)} // Mark the answer as incorrect
          className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
        >
          Got it wrong
        </button>
      </div>
      {/* Button to navigate to the Add New Flashcard page */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/add-flashcard")} // Redirect to the add flashcard page
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          Add New Flashcard
        </button>
      </div>
      <div className="mt-6">
        <Link
          to={`/edit-flashcard/${currentFlashcard._id}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition-colors"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Flashcards;
