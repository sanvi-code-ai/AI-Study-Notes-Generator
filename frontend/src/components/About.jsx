import React from 'react';

const About = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 transition-colors duration-300">
      
      {/* Top Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3">
          About Study Notes AI
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base max-w-xl mx-auto">
          An AI-powered learning assistant designed to transform raw study material into organized notes and practice quizzes in seconds.
        </p>
      </div>

      {/* Main Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-300 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          What is this project?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
          Study Notes AI helps students and learners quickly summarize long text, generate concise study notes, and generate multiple-choice quizzes for revision. Built using modern web technologies, it aims to streamline self-study routines.
        </p>

        {/* Features List */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Key Features:
        </h3>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
            <span><strong className="text-gray-800 dark:text-gray-200">Smart Notes Generator:</strong> Converts unstructured content into structured Markdown study notes.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
            <span><strong className="text-gray-800 dark:text-gray-200">AI Quiz Creator:</strong> Automatically creates 15 multiple-choice practice questions with options and answers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
            <span><strong className="text-gray-800 dark:text-gray-200">PDF & Copy Export:</strong> Easily download generated study notes as a PDF or copy them with one click.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
            <span><strong className="text-gray-800 dark:text-gray-200">Dark Mode Support:</strong> Comfortable night-time studying interface.</span>
          </li>
        </ul>

        {/* Tech Stack */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Tech Stack Used:
        </h3>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full">
            React.js
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full">
            Tailwind CSS
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full">
            Node.js / Express
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full">
            Google Gemini API
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full">
            React Router
          </span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        Study Notes AI • Built for learning and practice.
      </div>

    </main>
  );
};

export default About;