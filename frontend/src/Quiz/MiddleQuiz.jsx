// import React, { useState } from 'react';
// import { CheckCircle2, XCircle, RotateCcw, Award, Sparkles, RefreshCw } from 'lucide-react';

// const MiddleQuiz = () => {
//   const [inputText, setInputText] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // Interactive quiz states
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const [isFinished, setIsFinished] = useState(false);

//   const wordCount = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
//   const charCount = inputText.length;

//   const handleClear = () => {
//     setInputText('');
//     setQuestions([]);
//     resetQuizState();
//   };

//   const resetQuizState = () => {
//     setCurrentIndex(0);
//     setSelectedOption(null);
//     setScore(0);
//     setIsFinished(false);
//   };

//   const handleGenerateQuiz = async () => {
//     if (!inputText.trim()) {
//       alert('Please enter some text first!');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/notes/quiz", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: inputText }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         let parsedQuestions = [];
        
//         // Handle array responses or stringified JSON responses
//         if (Array.isArray(data.questions)) {
//           parsedQuestions = data.questions;
//         } else if (typeof data.quiz === 'string') {
//           try {
//             parsedQuestions = JSON.parse(data.quiz);
//           } catch {
//             alert("Backend returned plain text. Ensure backend returns structured JSON for interactive quizzes.");
//             return;
//           }
//         }

//         if (parsedQuestions.length > 0) {
//           setQuestions(parsedQuestions);
//           resetQuizState();
//         } else {
//           alert("No questions were generated. Please try again with more descriptive text.");
//         }
//       } else {
//         alert(data.message || "Failed to generate quiz");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong connecting to the backend");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentQuestion = questions[currentIndex];

//   const handleSelectOption = (index) => {
//     if (selectedOption !== null) return; // Lock choices once selected

//     setSelectedOption(index);
//     if (index === currentQuestion.correctIndex) {
//       setScore((prev) => prev + 1);
//     }
//   };

//   const handleNext = () => {
//     setSelectedOption(null);
//     if (currentIndex + 1 < questions.length) {
//       setCurrentIndex((prev) => prev + 1);
//     } else {
//       setIsFinished(true);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-6">
      
//       {/* Left Box: Input Section */}
//       <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-[480px] transition-colors duration-300">
        
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//             Your Content
//           </h3>
//           <button 
//             onClick={handleClear}
//             className="px-3 py-1 text-xs bg-gray-100 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-950 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
//           >
//             Clear
//           </button>
//         </div>

//         <textarea
//           placeholder="Paste or type text to create an interactive quiz from..."
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           className="w-full flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm transition-colors"
//         />

//         <div className="mt-3">
//           <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
//             <span>Words: <b>{wordCount}</b></span>
//             <span>Characters: <b>{charCount}</b></span>
//           </div>

//           <button 
//             onClick={handleGenerateQuiz} 
//             disabled={loading}
//             className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
//               loading 
//                 ? 'bg-purple-400 cursor-not-allowed' 
//                 : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
//             }`}
//           >
//             {loading ? (
//               <>
//                 <RefreshCw className="w-4 h-4 animate-spin" /> Generating... Please wait
//               </>
//             ) : (
//               <>
//                 <Sparkles className="w-4 h-4" /> Generate Interactive Quiz
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Right Box: Interactive Output Section */}
//       <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-[480px] transition-colors duration-300">
        
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//             Interactive Quiz
//           </h3>

//           {questions.length > 0 && !isFinished && (
//             <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
//               Score: {score} / {questions.length}
//             </span>
//           )}
//         </div>
        
//         <div className="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto text-sm transition-colors flex flex-col justify-between">
//           {questions.length === 0 ? (
//             <div className="h-full flex flex-col justify-center items-center text-gray-400 dark:text-gray-500 text-center px-4">
//               <Sparkles className="w-8 h-8 text-purple-500 mb-2 opacity-60" />
//               <span>Your AI-generated interactive questions will appear here.</span>
//             </div>
//           ) : !isFinished ? (
//             <div className="flex flex-col h-full justify-between">
//               <div>
//                 {/* Progress bar */}
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">
//                   <span>Question {currentIndex + 1} of {questions.length}</span>
//                 </div>

//                 <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4 text-base">
//                   {currentQuestion.question}
//                 </h4>

//                 {/* Multiple choice options */}
//                 <div className="space-y-2.5">
//                   {currentQuestion.options.map((option, index) => {
//                     const isSelected = selectedOption === index;
//                     const isCorrect = index === currentQuestion.correctIndex;

//                     let optionStyle = "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700";

//                     if (selectedOption !== null) {
//                       if (isCorrect) {
//                         optionStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium";
//                       } else if (isSelected) {
//                         optionStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-medium";
//                       }
//                     }

//                     return (
//                       <button
//                         key={index}
//                         onClick={() => handleSelectOption(index)}
//                         disabled={selectedOption !== null}
//                         className={`w-full p-3 text-left text-sm rounded-lg border transition-all flex items-center justify-between ${optionStyle}`}
//                       >
//                         <span>{option}</span>
//                         {selectedOption !== null && isCorrect && (
//                           <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
//                         )}
//                         {selectedOption !== null && isSelected && !isCorrect && (
//                           <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 ml-2" />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Explanation text */}
//                 {selectedOption !== null && currentQuestion.explanation && (
//                   <div className="mt-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-xs text-purple-800 dark:text-purple-300">
//                     <span className="font-semibold block mb-0.5">Explanation:</span>
//                     {currentQuestion.explanation}
//                   </div>
//                 )}
//               </div>

//               {/* Next Question Button */}
//               {selectedOption !== null && (
//                 <button
//                   onClick={handleNext}
//                   className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-lg transition-all"
//                 >
//                   {currentIndex + 1 === questions.length ? "View Score" : "Next Question"}
//                 </button>
//               )}
//             </div>
//           ) : (
//             /* Results Screen */
//             <div className="h-full flex flex-col justify-center items-center text-center py-4">
//               <Award className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-2" />
//               <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
//                 Quiz Completed!
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//                 You scored <strong className="text-purple-600 dark:text-purple-400">{score}</strong> out of <strong>{questions.length}</strong>
//               </p>

//               <button
//                 onClick={resetQuizState}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-lg transition-all"
//               >
//                 <RotateCcw className="w-4 h-4" /> Try Again
//               </button>
//             </div>
//           )}
//         </div>

//       </div>

//     </div>
//   );
// };

// export default MiddleQuiz;

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MiddleQuiz = () => {
  const [inputText, setInputText] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
  const charCount = inputText.length;

  const handleClear = () => {
    setInputText('');
    setGeneratedQuiz('');
  };

  const handleGenerateQuiz = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text first!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/notes/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedQuiz(data.quiz);
      } else {
        alert(data.message || "Failed to generate quiz");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong connecting to the backend");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedQuiz);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-6">
      
      {/* Left Box: Input Section */}
      <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-[480px] transition-colors duration-300">
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Your Content
          </h3>
          <button 
            onClick={handleClear}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-950 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
          >
            Clear
          </button>
        </div>

        <textarea
          placeholder="Paste or type text to create quiz from.."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm transition-colors"
        />

        <div className="mt-3">
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span>Words: <b>{wordCount}</b></span>
            <span>Characters: <b>{charCount}</b></span>
          </div>

          <button 
            onClick={handleGenerateQuiz} 
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all ${
              loading 
                ? 'bg-purple-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
            }`}
          >
            {loading ? 'Generating... Please wait' : 'Generate Quiz'}
          </button>
        </div>
      </div>

      {/* Right Box: Output Section */}
      <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-[480px] transition-colors duration-300">
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Generated Quiz
          </h3>

          {generatedQuiz && (
            <button 
              onClick={handleCopy}
              className="text-xs bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-3 py-1 rounded hover:bg-purple-200 transition-colors"
            >
              {copied ? 'Copied! ✓' : 'Copy Quiz'}
            </button>
          )}
        </div>
        
        <div className="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto text-sm transition-colors">
          {generatedQuiz ? (
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              <ReactMarkdown>{generatedQuiz}</ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-gray-400 dark:text-gray-500">
              <span>Your AI-generated quiz questions will appear here.</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default MiddleQuiz;