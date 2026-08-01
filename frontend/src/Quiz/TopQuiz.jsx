import React from 'react';

const TopQuiz = () => {
  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
        AI Quiz Generator
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-base max-w-lg mx-auto">
        Paste your text or notes below to generate practice quiz questions.
      </p>
    </div>
  );
};

export default TopQuiz;