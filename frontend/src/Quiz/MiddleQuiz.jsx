// // import { useContext, useState } from "react";
// // import { QuizContext } from "../context/QuizContext";
// // import { db } from "../firebase/firebase";
// // import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// // import { auth } from "../firebase/firebase";

// // const MiddleQuiz = () => {
// //   const { quizQuestions } = useContext(QuizContext);

// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [selectedAnswer, setSelectedAnswer] = useState("");
// //   const [score, setScore] = useState(0);
// //   const [incorrectQuestions, setIncorrectQuestions] = useState([]);

// //   const currentQuiz = quizQuestions[currentQuestion];
// //   const quizFinished = currentQuestion === quizQuestions.length;

// //   if (quizQuestions.length === 0) {
// //     return (
// //       <div className="text-center mt-20">
// //         <h2 className="text-2xl font-bold">
// //           No quiz available.
// //         </h2>

// //         <p className="text-gray-500 mt-2">
// //           Please generate notes first.
// //         </p>
// //       </div>
// //     );
// //   }

// //   // Save quiz result to Firebase
// //   const saveQuizResult = async (finalScore, finalIncorrectQuestions) => {
// //     try {
// //       // await addDoc(collection(db, "quizResults"), {
// //       //   score: finalScore,
// //       //   totalQuestions: quizQuestions.length,
// //       //   percentage: Math.round(
// //       //     (finalScore / quizQuestions.length) * 100
// //       //   ),
// //       //   incorrectQuestions: finalIncorrectQuestions,
// //       //   createdAt: serverTimestamp(),
// //       // });
// //       await addDoc(collection(db, "quizResults"), {
// //   score,
// //   totalQuestions: quizQuestions.length,
// //   percentage: Math.round(
// //     (score / quizQuestions.length) * 100
// //   ),
// //   incorrectQuestions,
// //   createdAt: serverTimestamp(),
// //   userId: auth.currentUser.uid,
// // });

// //       console.log("Quiz result saved successfully!");
// //     } catch (error) {
// //       console.error("Error saving quiz result:", error);
// //     }
// //   };

// //   if (quizFinished) {
// //     return (
// //       <div className="max-w-3xl mx-auto p-8 text-center">

// //         <h1 className="text-4xl font-bold text-purple-600 mb-6">
// //           🎉 Quiz Completed!
// //         </h1>

// //         <p className="text-2xl mb-4">
// //           Your Score
// //         </p>

// //         <p className="text-5xl font-bold text-green-600 mb-8">
// //           {score} / {quizQuestions.length}
// //         </p>

// //         <button
// //           onClick={() => {
// //             setCurrentQuestion(0);
// //             setScore(0);
// //             setSelectedAnswer("");
// //             setIncorrectQuestions([]);
// //           }}
// //           className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
// //         >
// //           Restart Quiz
// //         </button>

// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto p-8">

// //       <h1 className="text-3xl font-bold text-purple-600 mb-8">
// //         Interactive Quiz
// //       </h1>

// //       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">

// //         <p className="text-sm text-gray-500 mb-4">
// //           Question {currentQuestion + 1} of {quizQuestions.length}
// //         </p>

// //         <h2 className="text-2xl font-semibold mb-8">
// //           {currentQuiz.question}
// //         </h2>

// //         <div className="space-y-4">

// //           {currentQuiz.options.map((option, index) => (

// //             <button
// //               key={index}
// //               onClick={() => {

// //                 if (selectedAnswer) return;

// //                 setSelectedAnswer(option);

// //                 if (option === currentQuiz.answer) {
// //   setScore((prev) => prev + 1);
// // } else {
// //   setIncorrectQuestions((prev) => [
// //     ...prev,
// //     currentQuiz.question,
// //   ]);
// // }

// //               }}

// //               className={`w-full text-left p-4 border rounded-lg transition ${
// //                 selectedAnswer === option
// //                   ? option === currentQuiz.answer
// //                     ? "bg-green-500 text-white"
// //                     : "bg-red-500 text-white"
// //                   : "hover:bg-purple-100 dark:hover:bg-purple-900"
// //               }`}
// //             >
// //               {option}
// //             </button>

// //           ))}

// //         </div>

// //         <div className="flex justify-between items-center mt-8">

// //           <p className="font-semibold text-purple-600">
// //             Score: {score}
// //           </p>

// //           <button
// //             disabled={!selectedAnswer}
// //             onClick={async () => {

// //               let finalScore = score;
// //               let finalIncorrectQuestions = incorrectQuestions;

// //               // Include the current answer
// //               if (selectedAnswer === currentQuiz.answer) {

// //                 finalScore = score + 1;

// //               } else {

// //                 finalIncorrectQuestions = [
// //                   ...incorrectQuestions,
// //                   currentQuiz.question
// //                 ];

// //               }

// //               if (currentQuestion < quizQuestions.length - 1) {

// //                 setCurrentQuestion((prev) => prev + 1);
// //                 setSelectedAnswer("");

// //               } else {

// //                 await saveQuizResult(
// //                   finalScore,
// //                   finalIncorrectQuestions
// //                 );

// //                 setScore(finalScore);
// //                 setIncorrectQuestions(finalIncorrectQuestions);
// //                 setSelectedAnswer("");
// //                 setCurrentQuestion(quizQuestions.length);
// //               }

// //             }}

// //             className={`px-6 py-2 rounded-lg text-white ${
// //               selectedAnswer
// //                 ? "bg-purple-600 hover:bg-purple-700"
// //                 : "bg-gray-400 cursor-not-allowed"
// //             }`}
// //           >
// //             Next Question
// //           </button>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // };

// // export default MiddleQuiz;


// import { useContext, useState } from "react";
// import { QuizContext } from "../context/QuizContext";
// import { db } from "../firebase/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { auth } from "../firebase/firebase";

// const MiddleQuiz = () => {
//   const { quizQuestions } = useContext(QuizContext);

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [score, setScore] = useState(0);
//   const [incorrectQuestions, setIncorrectQuestions] = useState([]);

//   const currentQuiz = quizQuestions[currentQuestion];
//   const quizFinished = currentQuestion === quizQuestions.length;

//   if (quizQuestions.length === 0) {
//     return (
//       <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6">
//         <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 shadow-sm">
//           <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
//             <svg
//               className="w-8 h-8 text-purple-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="1.8"
//                 d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6"
//               />
//             </svg>
//           </div>

//           <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
//             No quiz available
//           </h2>

//           <p className="text-slate-500 dark:text-slate-400 mt-3">
//             Generate your study notes first, then create a quiz from them.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const saveQuizResult = async (finalScore, finalIncorrectQuestions) => {
//     try {
//       await addDoc(collection(db, "quizResults"), {
//         score: finalScore,
//         totalQuestions: quizQuestions.length,
//         percentage: Math.round(
//           (finalScore / quizQuestions.length) * 100
//         ),
//         incorrectQuestions: finalIncorrectQuestions,
//         createdAt: serverTimestamp(),
//         userId: auth.currentUser.uid,
//       });

//       console.log("Quiz result saved successfully!");
//     } catch (error) {
//       console.error("Error saving quiz result:", error);
//     }
//   };

//   if (quizFinished) {
//     const percentage = Math.round(
//       (score / quizQuestions.length) * 100
//     );

//     return (
//       <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-6 py-12">
//         <div className="max-w-3xl mx-auto">

//           <div className="text-center mb-8">
//             <p className="text-sm font-semibold tracking-widest text-purple-600 uppercase mb-3">
//               Quiz Complete
//             </p>

//             <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
//               Great work!
//             </h1>

//             <p className="text-slate-500 dark:text-slate-400 mt-3">
//               Here is your performance summary.
//             </p>
//           </div>

//           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">

//             <div className="p-8 md:p-12 text-center">

//               <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
//                 <span className="text-3xl font-bold text-purple-600">
//                   {percentage}%
//                 </span>
//               </div>

//               <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
//                 Your Score
//               </p>

//               <p className="text-5xl font-bold text-slate-900 dark:text-white mt-2">
//                 {score}
//                 <span className="text-2xl text-slate-400">
//                   {" "} / {quizQuestions.length}
//                 </span>
//               </p>

//               <div className="grid grid-cols-2 gap-4 mt-10 max-w-md mx-auto">

//                 <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
//                   <p className="text-2xl font-bold text-slate-900 dark:text-white">
//                     {quizQuestions.length}
//                   </p>
//                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//                     Questions
//                   </p>
//                 </div>

//                 <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
//                   <p className="text-2xl font-bold text-red-500">
//                     {incorrectQuestions.length}
//                   </p>
//                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//                     Incorrect
//                   </p>
//                 </div>

//               </div>

//               <button
//                 onClick={() => {
//                   setCurrentQuestion(0);
//                   setScore(0);
//                   setSelectedAnswer("");
//                   setIncorrectQuestions([]);
//                 }}
//                 className="mt-10 px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition shadow-sm"
//               >
//                 Restart Quiz
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const progress =
//     ((currentQuestion + 1) / quizQuestions.length) * 100;

//   return (
//     <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-6 py-10">

//       <div className="max-w-4xl mx-auto">

//         {/* Header */}
//         <div className="mb-8">

//           <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

//             <div>
//               <p className="text-sm font-semibold tracking-widest text-purple-600 uppercase mb-2">
//                 Knowledge Check
//               </p>

//               <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
//                 Test your understanding
//               </h1>

//               <p className="text-slate-500 dark:text-slate-400 mt-2">
//                 Answer each question and see how well you remember the material.
//               </p>
//             </div>

//             <div className="flex items-center gap-3">

//               <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
//                 <span className="text-sm text-slate-500 dark:text-slate-400">
//                   Score
//                 </span>

//                 <span className="ml-2 font-bold text-purple-600">
//                   {score}
//                 </span>
//               </div>

//             </div>

//           </div>

//           {/* Progress */}
//           <div className="mt-7">

//             <div className="flex justify-between text-sm mb-2">
//               <span className="font-medium text-slate-600 dark:text-slate-300">
//                 Question {currentQuestion + 1} of {quizQuestions.length}
//               </span>

//               <span className="text-slate-400">
//                 {Math.round(progress)}%
//               </span>
//             </div>

//             <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-purple-600 rounded-full transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>

//           </div>
//         </div>

//         {/* Question Card */}
//         <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">

//           <div className="p-7 md:p-10">

//             <div className="flex items-start gap-4 mb-8">

//               <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
//                 <span className="font-bold text-purple-600">
//                   {currentQuestion + 1}
//                 </span>
//               </div>

//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
//                   Question
//                 </p>

//                 <h2 className="text-xl md:text-2xl font-semibold leading-relaxed text-slate-900 dark:text-white">
//                   {currentQuiz.question}
//                 </h2>
//               </div>

//             </div>

//             {/* Options */}
//             <div className="space-y-3">

//               {currentQuiz.options.map((option, index) => {

//                 const isSelected = selectedAnswer === option;
//                 const isCorrect = option === currentQuiz.answer;

//                 let optionStyle =
//                   "border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20";

//                 if (selectedAnswer) {
//                   if (isCorrect) {
//                     optionStyle =
//                       "border-green-500 bg-green-50 dark:bg-green-900/20";
//                   } else if (isSelected) {
//                     optionStyle =
//                       "border-red-500 bg-red-50 dark:bg-red-900/20";
//                   } else {
//                     optionStyle =
//                       "border-slate-200 dark:border-slate-700 opacity-60";
//                   }
//                 }

//                 return (
//                   <button
//                     key={index}
//                     onClick={() => {

//                       if (selectedAnswer) return;

//                       setSelectedAnswer(option);

//                       if (option === currentQuiz.answer) {
//                         setScore((prev) => prev + 1);
//                       } else {
//                         setIncorrectQuestions((prev) => [
//                           ...prev,
//                           currentQuiz.question,
//                         ]);
//                       }

//                     }}
//                     className={`w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl border-2 text-left transition-all duration-200 ${optionStyle}`}
//                   >

//                     <div
//                       className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center font-semibold ${
//                         selectedAnswer && isCorrect
//                           ? "bg-green-500 text-white"
//                           : selectedAnswer && isSelected
//                           ? "bg-red-500 text-white"
//                           : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
//                       }`}
//                     >
//                       {String.fromCharCode(65 + index)}
//                     </div>

//                     <span className="flex-1 font-medium text-slate-700 dark:text-slate-200">
//                       {option}
//                     </span>

//                     {selectedAnswer && isCorrect && (
//                       <span className="text-green-600 font-bold text-lg">
//                         ✓
//                       </span>
//                     )}

//                     {selectedAnswer && isSelected && !isCorrect && (
//                       <span className="text-red-600 font-bold text-lg">
//                         ✕
//                       </span>
//                     )}

//                   </button>
//                 );
//               })}

//             </div>

//             {/* Bottom */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-9 pt-6 border-t border-slate-100 dark:border-slate-800">

//               <div>
//                 {selectedAnswer ? (
//                   <p className="text-sm font-medium">
//                     {selectedAnswer === currentQuiz.answer ? (
//                       <span className="text-green-600">
//                         Correct answer!
//                       </span>
//                     ) : (
//                       <span className="text-red-500">
//                         Review the correct answer above.
//                       </span>
//                     )}
//                   </p>
//                 ) : (
//                   <p className="text-sm text-slate-400">
//                     Select an answer to continue.
//                   </p>
//                 )}
//               </div>

//               <button
//                 disabled={!selectedAnswer}
//                 onClick={async () => {

//                   let finalScore = score;
//                   let finalIncorrectQuestions = incorrectQuestions;

//                   if (selectedAnswer === currentQuiz.answer) {
//                     finalScore = score + 1;
//                   } else {
//                     finalIncorrectQuestions = [
//                       ...incorrectQuestions,
//                       currentQuiz.question,
//                     ];
//                   }

//                   if (currentQuestion < quizQuestions.length - 1) {

//                     setCurrentQuestion((prev) => prev + 1);
//                     setSelectedAnswer("");

//                   } else {

//                     await saveQuizResult(
//                       finalScore,
//                       finalIncorrectQuestions
//                     );

//                     setScore(finalScore);
//                     setIncorrectQuestions(finalIncorrectQuestions);
//                     setSelectedAnswer("");
//                     setCurrentQuestion(quizQuestions.length);
//                   }

//                 }}
//                 className={`px-7 py-3 rounded-xl font-semibold text-white transition ${
//                   selectedAnswer
//                     ? "bg-purple-600 hover:bg-purple-700 shadow-sm"
//                     : "bg-slate-300 dark:bg-slate-700 cursor-not-allowed"
//                 }`}
//               >
//                 {currentQuestion === quizQuestions.length - 1
//                   ? "Finish Quiz"
//                   : "Next Question"}
//               </button>

//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MiddleQuiz;



import { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const MiddleQuiz = () => {
  const { quizQuestions } = useContext(QuizContext);

  const questions = Array.isArray(quizQuestions)
    ? quizQuestions.filter(
        (question) =>
          question &&
          typeof question.question === "string" &&
          Array.isArray(question.options) &&
          question.options.length > 0 &&
          typeof question.answer === "string"
      )
    : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [savingResult, setSavingResult] = useState(false);

  const currentQuiz = questions[currentQuestion];

  const quizFinished =
    questions.length > 0 &&
    currentQuestion >= questions.length;

  // --------------------------------------------------
  // NO QUIZ
  // --------------------------------------------------

  if (questions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6">

        <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 shadow-sm">

          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">

            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6"
              />
            </svg>

          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No quiz available
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-3">
            Generate your study notes first, then create a quiz from them.
          </p>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // SAVE QUIZ RESULT
  // --------------------------------------------------

  const saveQuizResult = async (
    finalScore,
    finalIncorrectQuestions
  ) => {
    try {
      setSavingResult(true);

      if (!auth.currentUser) {
        console.error("No authenticated user.");
        return;
      }

      await addDoc(collection(db, "quizResults"), {
        score: finalScore,
        totalQuestions: questions.length,
        percentage: Math.round(
          (finalScore / questions.length) * 100
        ),
        incorrectQuestions: finalIncorrectQuestions,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });

      console.log("Quiz result saved successfully!");
    } catch (error) {
      console.error(
        "Error saving quiz result:",
        error
      );
    } finally {
      setSavingResult(false);
    }
  };

  // --------------------------------------------------
  // QUIZ FINISHED
  // --------------------------------------------------

  if (quizFinished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-6 py-12">

        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-8">

            <p className="text-sm font-semibold tracking-widest text-purple-600 uppercase mb-3">
              Quiz Complete
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Great work!
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-3">
              Here is your performance summary.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">

            <div className="p-8 md:p-12 text-center">

              <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">

                <span className="text-3xl font-bold text-purple-600">
                  {percentage}%
                </span>

              </div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Your Score
              </p>

              <p className="text-5xl font-bold text-slate-900 dark:text-white mt-2">

                {score}

                <span className="text-2xl text-slate-400">
                  {" "} / {questions.length}
                </span>

              </p>

              <div className="grid grid-cols-2 gap-4 mt-10 max-w-md mx-auto">

                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">

                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {questions.length}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Questions
                  </p>

                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">

                  <p className="text-2xl font-bold text-red-500">
                    {incorrectQuestions.length}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Incorrect
                  </p>

                </div>

              </div>

              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setSelectedAnswer("");
                  setIncorrectQuestions([]);
                }}
                className="mt-10 px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition shadow-sm"
              >
                Restart Quiz
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // EXTRA SAFETY CHECK
  // --------------------------------------------------

  if (!currentQuiz) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Unable to load this question
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            The generated quiz contains invalid question data.
          </p>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // PROGRESS
  // --------------------------------------------------

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  // --------------------------------------------------
  // ANSWER HANDLER
  // --------------------------------------------------

  const handleAnswer = (option) => {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(option);

    if (option === currentQuiz.answer) {
      setScore((previousScore) => previousScore + 1);
    } else {
      setIncorrectQuestions((previousQuestions) => [
        ...previousQuestions,
        currentQuiz.question,
      ]);
    }
  };

  // --------------------------------------------------
  // NEXT QUESTION
  // --------------------------------------------------

  const handleNextQuestion = async () => {
    if (!selectedAnswer) {
      return;
    }

    let finalScore = score;

    let finalIncorrectQuestions =
      incorrectQuestions;

    /*
      The score is already updated when the user
      selects an answer, but React state updates
      asynchronously. Therefore we calculate the
      final value manually here.
    */

    if (selectedAnswer === currentQuiz.answer) {
      finalScore = score;
    } else {
      finalIncorrectQuestions =
        incorrectQuestions;
    }

    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion(
        (previousQuestion) =>
          previousQuestion + 1
      );

      setSelectedAnswer("");

    } else {

      await saveQuizResult(
        finalScore,
        finalIncorrectQuestions
      );

      setScore(finalScore);

      setIncorrectQuestions(
        finalIncorrectQuestions
      );

      setSelectedAnswer("");

      setCurrentQuestion(
        questions.length
      );
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-6 py-10">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>

              <p className="text-sm font-semibold tracking-widest text-purple-600 uppercase mb-2">
                Knowledge Check
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Test your understanding
              </h1>

              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Answer each question and see how well you remember the material.
              </p>

            </div>

            <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">

              <span className="text-sm text-slate-500 dark:text-slate-400">
                Score
              </span>

              <span className="ml-2 font-bold text-purple-600">
                {score}
              </span>

            </div>

          </div>

          {/* PROGRESS */}

          <div className="mt-7">

            <div className="flex justify-between text-sm mb-2">

              <span className="font-medium text-slate-600 dark:text-slate-300">
                Question {currentQuestion + 1} of {questions.length}
              </span>

              <span className="text-slate-400">
                {Math.round(progress)}%
              </span>

            </div>

            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* QUESTION CARD */}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">

          <div className="p-7 md:p-10">

            <div className="flex items-start gap-4 mb-8">

              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">

                <span className="font-bold text-purple-600">
                  {currentQuestion + 1}
                </span>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Question
                </p>

                <h2 className="text-xl md:text-2xl font-semibold leading-relaxed text-slate-900 dark:text-white">
                  {currentQuiz.question}
                </h2>

              </div>

            </div>

            {/* OPTIONS */}

            <div className="space-y-3">

              {currentQuiz.options.map(
                (option, index) => {

                  const isSelected =
                    selectedAnswer === option;

                  const isCorrect =
                    option === currentQuiz.answer;

                  let optionStyle =
                    "border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20";

                  if (selectedAnswer) {

                    if (isCorrect) {

                      optionStyle =
                        "border-green-500 bg-green-50 dark:bg-green-900/20";

                    } else if (isSelected) {

                      optionStyle =
                        "border-red-500 bg-red-50 dark:bg-red-900/20";

                    } else {

                      optionStyle =
                        "border-slate-200 dark:border-slate-700 opacity-60";

                    }

                  }

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswer(option)
                      }
                      className={`w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl border-2 text-left transition-all duration-200 ${optionStyle}`}
                    >

                      <div
                        className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center font-semibold ${
                          selectedAnswer &&
                          isCorrect
                            ? "bg-green-500 text-white"
                            : selectedAnswer &&
                              isSelected
                            ? "bg-red-500 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </div>

                      <span className="flex-1 font-medium text-slate-700 dark:text-slate-200">
                        {option}
                      </span>

                      {selectedAnswer &&
                        isCorrect && (
                          <span className="text-green-600 font-bold text-lg">
                            ✓
                          </span>
                        )}

                      {selectedAnswer &&
                        isSelected &&
                        !isCorrect && (
                          <span className="text-red-600 font-bold text-lg">
                            ✕
                          </span>
                        )}

                    </button>
                  );
                }
              )}

            </div>

            {/* BOTTOM */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-9 pt-6 border-t border-slate-100 dark:border-slate-800">

              <div>

                {selectedAnswer ? (

                  <p className="text-sm font-medium">

                    {selectedAnswer ===
                    currentQuiz.answer ? (
                      <span className="text-green-600">
                        Correct answer!
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Review the correct answer above.
                      </span>
                    )}

                  </p>

                ) : (

                  <p className="text-sm text-slate-400">
                    Select an answer to continue.
                  </p>

                )}

              </div>

              <button
                disabled={
                  !selectedAnswer ||
                  savingResult
                }
                onClick={handleNextQuestion}
                className={`px-7 py-3 rounded-xl font-semibold text-white transition ${
                  selectedAnswer &&
                  !savingResult
                    ? "bg-purple-600 hover:bg-purple-700 shadow-sm"
                    : "bg-slate-300 dark:bg-slate-700 cursor-not-allowed"
                }`}
              >

                {savingResult
                  ? "Saving..."
                  : currentQuestion ===
                    questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MiddleQuiz;