# Flashcard App (Frontend)

This is the frontend part of a **MERN stack** flashcard application. It allows users to create, review, and manage flashcards using the **Leitner System** for spaced repetition. The frontend is built with **React**, **React Router**, and **Tailwind CSS**.

---

## Features

1. **User Authentication**:

   - Login and registration using **JWT (JSON Web Tokens)**.
   - Protected routes for authenticated users.

2. **Flashcard Management**:

   - Add new flashcards with a question and answer.
   - Edit existing flashcards.
   - Delete flashcards.

3. **Leitner System**:

   - Flashcards start in **Box 1**.
   - If answered correctly, they move to the next box.
   - If answered incorrectly, they go back to **Box 1**.
   - Higher boxes have longer review intervals.

4. **Spaced Repetition**:

   - Flashcards are fetched based on their **next review date**.
   - Progress indicator shows the number of flashcards due for review today.

5. **Interactive UI**:

   - Flip cards to reveal the answer.
   - Buttons to mark flashcards as "Got it right" or "Got it wrong".
   - Simple and clean design using **Tailwind CSS**.

6. **Navigation**:
   - Responsive navbar with links to Home, Add Flashcard, Login, Register, and Logout.

---

## Technologies Used

- **Frontend**:

  - React
  - React Router (v6)
  - Axios (for API requests)
  - Tailwind CSS (for styling)

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

---

## Setup Instructions

### Prerequisites

1. **Node.js** and **npm** installed on your machine.
2. **Backend server** running (see the backend README for setup instructions).

### Steps to Run the Frontend

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd frontend

   ```

2. Install dependencies:

npm install

3. Set up environment variables:

Create a .env file in the root of the frontend folder.

Add the following variables:

VITE_API_BASE_URL=http://localhost:5000

Replace http://localhost:5000 with the URL of your backend server.

4. Start the development server:

npm run dev

5. Open the app:

Visit http://localhost:5173 in your browser.

---

Project Structure

frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── AddFlashcard.jsx
│ │ ├── EditFlashcard.jsx
│ │ ├── Flashcards.jsx
│ │ ├── Login.jsx
│ │ ├── Logout.jsx
│ │ ├── Navbar.jsx
│ │ └── Register.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .env
├── .gitignore
├── package.json
├── README.md
└── vite.config.js

---

Components

1. Navbar:

Displays navigation links (Home, Add Flashcard, Login, Register, Logout).

Conditionally shows Login/Register or Logout based on authentication status.

2. Login:

Allows users to log in using their credentials.

3. Register:

Allows new users to register.

4. Flashcards:

Displays flashcards due for review.

Allows users to flip cards, mark them as correct or incorrect, and view progress.

5. AddFlashcard:

Form to add a new flashcard.

6. EditFlashcard:

Form to edit an existing flashcard.

7. Logout:

Handles user logout by removing the JWT token and redirecting to the login page.

---

API Endpoints

The frontend interacts with the following backend API endpoints:

POST /login: User login.

POST /register: User registration.

GET /flashcards: Fetch all flashcards for the logged-in user.

POST /flashcards: Add a new flashcard.

PUT /flashcards/:id: Update a flashcard (e.g., move to the next box).

DELETE /flashcards/:id: Delete a flashcard.

---

Contributing

1. Fork the repository.

2. Create a new branch (git checkout -b feature/YourFeatureName).

3. Commit your changes (git commit -m 'Add some feature').

4. Push to the branch (git push origin feature/YourFeatureName).

5. Open a pull request.

---

Acknowledgments

Inspired by the Leitner System for spaced repetition.

Built with React and Tailwind CSS.
