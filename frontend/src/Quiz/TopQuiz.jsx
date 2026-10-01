// import React from 'react';

// const TopQuiz = () => {
//   return (
//     <div className="text-center my-10 px-4">
//       <h1 className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
//         AI Quiz Generator
//       </h1>
//       <p className="text-gray-600 dark:text-gray-300 text-base max-w-lg mx-auto">
//         Paste your text or notes below to generate practice quiz questions.
//       </p>
//     </div>
//   );
// };

// export default TopQuiz;

import React from "react";

const TopQuiz = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 px-6 pt-10 pb-4">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>

              <span className="text-xs font-semibold tracking-widest text-purple-600 uppercase">
                AI Learning Tools
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              AI Quiz Generator
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl leading-relaxed">
              Turn your study material into interactive practice questions
              and test how well you understand the topic.
            </p>
          </div>

          <div className="hidden md:flex w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 items-center justify-center">
            <svg
              className="w-7 h-7 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-8 0H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2m-8 0h8m-6 5h4m-4 3h3"
              />
            </svg>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TopQuiz;