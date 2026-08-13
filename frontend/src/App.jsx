import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header'; 
import MainContent from './components/MainContent';
import TopQuiz from './Quiz/TopQuiz';
import MiddleQuiz from './Quiz/MiddleQuiz';
import About from './components/About';
import SavedNotes from './components/Savednotes';
import SavedNoteDetails from "./components/SavedNoteDetails";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./dashboard/Dashboard";
import Auth from "./Auth";


const App = () => {
  const [darkMode, setdarkMode] = useState(false);

  const { currentUser, loading } = useContext(AuthContext);

  

 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
   

  if(loading){
    return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Loading...</p>
    </div>
  );
  }
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      
      {currentUser && (
  <Header
    darkMode={darkMode}
    setdarkMode={setdarkMode}
  />
)}

      <Routes>

  {/* Authentication */}
  <Route
    path="/Auth"
    element={
      currentUser ? (
        <Navigate to="/" />
      ) : (
        <Auth />
      )
    }
  />

  {/* Protected routes */}
  {currentUser ? (
    <>
      <Route
        path="/"
        element={
          <main>
            <MainContent
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />
          </main>
        }
      />

      <Route
        path="/quiz"
        element={
          <main>
            <TopQuiz
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />
            <MiddleQuiz
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />
          </main>
        }
      />

      <Route
        path="/About"
        element={
          <main>
            <About
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />
          </main>
        }
      />

      <Route
        path="/Saved-Notes"
        element={
          <main>
            <SavedNotes
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />
          </main>
        }
      />

      <Route
        path="/notes/:id"
        element={<SavedNoteDetails />}
      />

      <Route
        path="/dashboard"
        element={
          <main>
            <Dashboard
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />
          </main>
        }
      />
    </>
  ) : (
    /* Anyone not logged in gets redirected to Auth */
    <Route
      path="*"
      element={<Navigate to="/Auth" />}
    />
  )}

</Routes>

    </div>
  );
};

export default App;