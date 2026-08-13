#  AI Study Notes Generator

An AI-powered study assistant that converts study material into structured notes, generates interactive quizzes, tracks learning performance, and creates personalized study plans based on quiz performance.

---

##  Features

###  AI Study Notes Generation
- Generate structured study notes using AI.
- Choose different explanation styles.
- Get concise and organized study material.
- Generate notes from uploaded PDF files.
- Supports Markdown-formatted AI responses.

###  User Authentication
- Firebase Email/Password authentication.
- Create a new account.
- Secure login and logout.
- Protected application routes.
- Unauthenticated users are redirected to the authentication page.
- Each user's notes and quiz results are associated with their Firebase UID.

###  Saved Notes
- Save generated notes to Firebase Firestore.
- View previously saved notes.
- Open individual notes for detailed viewing.
- Delete saved notes.
- Notes are stored separately for each authenticated user.

###  Interactive AI Quiz
- Generate quizzes from study material.
- Multiple-choice questions.
- Instant answer feedback.
- Score tracking.
- Restart quiz functionality.
- Quiz results are stored in Firebase.

###  Learning Dashboard
Track your learning progress through:
- Total saved notes
- Quizzes attempted
- Average quiz score
- Best quiz score
- Recent saved notes

The dashboard updates the saved-note count in real time.

###  Personalized AI Study Plan
Based on the user's latest quiz performance, the application can generate:
- Performance analysis
- Weak areas
- 5-day study plan
- Daily study tasks
- AI-generated recommendations

This helps students move from simply generating notes to actually improving their learning.

###  Dark Mode
- Light and dark themes.
- Responsive UI.
- Theme-aware components throughout the application.

---

## Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- JavaScript
- React Markdown

### Backend
- Node.js
- Express.js

### Database & Authentication
- Firebase Authentication
- Firebase Firestore

### AI
- Google Gemini API

### Other Tools
- Postman
- jsPDF
- Git & GitHub

---



