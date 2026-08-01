import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header'; 
import MainContent from './components/MainContent';
import TopQuiz from './Quiz/TopQuiz';
import MiddleQuiz from './Quiz/MiddleQuiz';
import About from './components/About';


const App = () => {
  const [darkMode, setdarkMode] = useState(false);

 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      
      <Header darkMode={darkMode} setdarkMode={setdarkMode} />

      <Routes>
        <Route 
          path="/" 
          element={
            <main>
              
              <MainContent darkMode={darkMode} setdarkMode={setdarkMode} />
            </main>
          } 
        />

        <Route 
          path="/quiz" 
          element={
            <main>
              <TopQuiz darkMode={darkMode} setdarkMode={setdarkMode} />
              <MiddleQuiz darkMode={darkMode} setdarkMode={setdarkMode} />
            </main>
          } 
        />

      
        <Route 
          path="/About" 
          element={
            <main>
              
              <About darkMode={darkMode} setdarkMode={setdarkMode} />
            </main>
          } 
        />
      </Routes>

    </div>
  );
};

export default App;