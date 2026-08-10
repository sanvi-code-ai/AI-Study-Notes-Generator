An AI-powered web application that converts raw text and PDF documents into well-structured study notes using Google Gemini AI. It helps students quickly generate concise notes, save them for future use, and export them as PDF.

---

##  Features
###  AI Study Notes Generation
  - Convert raw text or study material into structured notes.
  - AI organizes content into:
  - Topic headings
  - Overview
  - Core concepts
  - Key terms and definitions
  - Key takeaways
  - Notes are generated in clean Markdown format.

###  PDF/Text Based Learning
  - Users can provide study material and generate notes from it.
  - Generated notes can be viewed directly inside the application.

###  Saved Notes
  - Save generated notes using Firebase Firestore.
  - View all saved notes.
  - Open individual notes to view their complete content.
  - Delete notes when they are no longer needed.

###  AI Quiz Generation
  - Generate multiple-choice questions from study notes.
  - Each quiz contains 10 questions.
  - Every question has 4 options.
  - Questions are generated according to the provided study material.

###  Interactive Quiz
  - Select answers interactively.
  - Correct answers increase the score.
  - Users can move through questions one at a time.
  - Final score is displayed after completing the quiz.
  - Quiz can be restarted.

### Learning Dashboard
The dashboard provides an overview of the user's learning activity:

  - Total saved notes
  - Quizzes attempted
  - Average quiz score
  - Best quiz score
  - Recently created notes

Recent notes can be clicked to open their complete content.

###  Dark Mode
  - Light and dark themes.
  - Theme changes are applied throughout the application.

###  Responsive UI
  - Responsive layout for different screen sizes.
  - Built using Tailwind CSS.


##  Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- React Markdown

### Backend
- Node.js
- Express.js

### Database
- Firebase Firestore

### AI
- Google Gemini API

### Development Tools
- Git
- GitHub
- Postman
- VS Code





