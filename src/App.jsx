import React from "react"; // Add this line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import Login from "./components/Login";
import Register from "./components/Register";
import Flashcards from "./components/Flashcards";
import AddFlashcard from "./components/AddFlashcard";
import EditFlashcard from "./components/EditFlashcard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />{" "}
        {/* Use element prop instead of component */}
        <Route path="/register" element={<Register />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/add-flashcard" element={<AddFlashcard />} />
        <Route path="/edit-flashcard/:id" element={<EditFlashcard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
