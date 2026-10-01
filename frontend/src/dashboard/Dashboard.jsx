// import React, { useEffect, useState } from "react";
// import { db, auth } from "../firebase/firebase";
// import { useNavigate } from "react-router-dom";

// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy,
//   limit,
//   onSnapshot,
// } from "firebase/firestore";

// const Dashboard = () => {
//   const [totalNotes, setTotalNotes] = useState(0);
//   const [quizzesAttempted, setQuizzesAttempted] = useState(0);
//   const [averageScore, setAverageScore] = useState(0);
//   const [bestScore, setBestScore] = useState(0);
//   const [recentNotes, setRecentNotes] = useState([]);
//   const [studyPlan, setStudyPlan] = useState(null);
//   const [planLoading, setPlanLoading] = useState(false);
//   const [latestQuiz, setLatestQuiz] = useState(null);

//   const navigate = useNavigate();

//   // ================================
//   // TOTAL NOTES - REAL TIME
//   // ================================

//   const fetchNotes = () => {
//     if (!auth.currentUser) return;

//     const notesQuery = query(
//       collection(db, "notes"),
//       where("userId", "==", auth.currentUser.uid)
//     );

//     const unsubscribe = onSnapshot(
//       notesQuery,
//       (snapshot) => {
//         setTotalNotes(snapshot.size);
//       },
//       (error) => {
//         console.error("Error fetching notes:", error);
//       }
//     );

//     return unsubscribe;
//   };

//   // ================================
//   // QUIZ RESULTS
//   // ================================

//   const fetchQuizResults = async () => {
//     if (!auth.currentUser) return;

//     try {
//       const resultsQuery = query(
//         collection(db, "quizResults"),
//         where("userId", "==", auth.currentUser.uid)
//       );

//       const snapshot = await getDocs(resultsQuery);

//       const results = snapshot.docs.map((doc) => doc.data());

//       setQuizzesAttempted(results.length);

//       if (results.length > 0) {
//         const totalPercentage = results.reduce(
//           (sum, result) => sum + (result.percentage || 0),
//           0
//         );

//         const highestScore = Math.max(
//           ...results.map((result) => result.score || 0)
//         );

//         setAverageScore(
//           Math.round(totalPercentage / results.length)
//         );

//         setBestScore(highestScore);
//       } else {
//         setAverageScore(0);
//         setBestScore(0);
//       }
//     } catch (error) {
//       console.error("Error fetching quiz results:", error);
//     }
//   };

//   // ================================
//   // LATEST QUIZ
//   // ================================

//   const fetchLatestQuiz = async () => {
//     if (!auth.currentUser) return;

//     try {
//       const quizQuery = query(
//         collection(db, "quizResults"),
//         where("userId", "==", auth.currentUser.uid),
//         orderBy("createdAt", "desc"),
//         limit(1)
//       );

//       const snapshot = await getDocs(quizQuery);

//       if (!snapshot.empty) {
//         const quizData = snapshot.docs[0].data();
//         setLatestQuiz(quizData);
//       } else {
//         setLatestQuiz(null);
//       }
//     } catch (error) {
//       console.error("Error fetching latest quiz:", error);
//     }
//   };

//   // ================================
//   // RECENT NOTES
//   // ================================

//   const fetchRecentNotes = async () => {
//   if (!auth.currentUser) return;

//   try {
//     const notesQuery = query(
//       collection(db, "notes"),
//       where("userId", "==", auth.currentUser.uid)
//     );

//     const snapshot = await getDocs(notesQuery);

//     const notes = snapshot.docs
//       .map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//       .sort((a, b) => {
//         const dateA = a.createdAt?.toDate?.() || new Date(0);
//         const dateB = b.createdAt?.toDate?.() || new Date(0);

//         return dateB - dateA;
//       })
//       .slice(0, 3);

//     setRecentNotes(notes);
//   } catch (error) {
//     console.error("Error fetching recent notes:", error);
//   }
// };

//   // ================================
//   // GENERATE STUDY PLAN
//   // ================================

//   const generateStudyPlan = async () => {
//     if (!latestQuiz) {
//       alert("Please complete a quiz first.");
//       return;
//     }

//     try {
//       setPlanLoading(true);

//       const response = await fetch(
//         "https://ai-study-notes-generator-ycb3.onrender.com/api/notes/study-plan",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             score: latestQuiz.score,
//             totalQuestions: latestQuiz.totalQuestions,
//             incorrectQuestions:
//               latestQuiz.incorrectQuestions || [],
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         alert(
//           data.message || "Failed to generate study plan"
//         );
//         return;
//       }

//       setStudyPlan(data.studyPlan);
//     } catch (error) {
//       console.error(
//         "Error generating study plan:",
//         error
//       );

//       alert(
//         "Something went wrong while generating your study plan."
//       );
//     } finally {
//       setPlanLoading(false);
//     }
//   };

//   // ================================
//   // USE EFFECT
//   // ================================

//   useEffect(() => {
//     const unsubscribe = fetchNotes();

//     fetchQuizResults();
//     fetchRecentNotes();
//     fetchLatestQuiz();

//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, []);

//   // ================================
//   // UI
//   // ================================

//   return (
//     <div className="max-w-7xl mx-auto p-8 w-full">

//       <h1 className="text-4xl font-bold text-purple-600 mb-2">
//         Learning Dashboard
//       </h1>

//       <p className="text-gray-500 mb-8">
//         Track your study progress and performance.
//       </p>

//       {/* ================= STATISTICS ================= */}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//         <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//           <h2 className="text-gray-500">
//             Total Notes
//           </h2>

//           <p className="text-4xl font-bold text-purple-600 mt-2">
//             {totalNotes}
//           </p>
//         </div>


//         <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//           <h2 className="text-gray-500">
//             Quizzes Attempted
//           </h2>

//           <p className="text-4xl font-bold text-purple-600 mt-2">
//             {quizzesAttempted}
//           </p>
//         </div>


//         <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//           <h2 className="text-gray-500">
//             Average Score
//           </h2>

//           <p className="text-4xl font-bold text-purple-600 mt-2">
//             {averageScore}%
//           </p>
//         </div>


//         <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//           <h2 className="text-gray-500">
//             Best Score
//           </h2>

//           <p className="text-4xl font-bold text-purple-600 mt-2">
//             {bestScore}/10
//           </p>
//         </div>

//       </div>


//       {/* ================= STUDY PLAN ================= */}

//       <div className="mt-10">

//         <button
//           onClick={generateStudyPlan}
//           disabled={planLoading}
//           className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
//         >
//           {planLoading
//             ? "Creating Your Study Plan..."
//             : "🎯 Generate My Study Plan"}
//         </button>

//       </div>


//       {studyPlan && (

//         <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

//           <h2 className="text-2xl font-bold text-purple-600 mb-4">
//             🎯 Your Personalized Study Plan
//           </h2>


//           <p className="text-gray-600 dark:text-gray-300 mb-6">
//             {studyPlan.performance}
//           </p>


//           <h3 className="text-xl font-semibold mb-3">
//             Weak Areas
//           </h3>


//           <ul className="list-disc ml-6 mb-6">

//             {studyPlan.weakAreas.map(
//               (area, index) => (
//                 <li key={index}>
//                   {area}
//                 </li>
//               )
//             )}

//           </ul>


//           <h3 className="text-xl font-semibold mb-4">
//             5-Day Study Plan
//           </h3>


//           <div className="space-y-4">

//             {studyPlan.studyPlan.map(
//               (day, index) => (

//                 <div
//                   key={index}
//                   className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
//                 >

//                   <h4 className="font-bold text-purple-600">
//                     {day.day} — {day.focus}
//                   </h4>


//                   <ul className="list-disc ml-6 mt-2">

//                     {day.tasks.map(
//                       (task, taskIndex) => (
//                         <li key={taskIndex}>
//                           {task}
//                         </li>
//                       )
//                     )}

//                   </ul>

//                 </div>

//               )
//             )}

//           </div>


//           <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">

//             <strong>
//               AI Recommendation:
//             </strong>

//             <p className="mt-1">
//               {studyPlan.recommendation}
//             </p>

//           </div>

//         </div>

//       )}


//       {/* ================= RECENT NOTES ================= */}

//       <div className="mt-10 w-full">

//         <h2 className="text-2xl font-bold mb-6">
//           Recent Notes
//         </h2>


//         {recentNotes.length === 0 ? (

//           <p className="text-gray-500">
//             No saved notes yet.
//           </p>

//         ) : (

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {recentNotes.map((note) => (

//               <div
//                 key={note.id}
//                 onClick={() =>
//                   navigate(`/notes/${note.id}`)
//                 }
//                 className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 w-full cursor-pointer hover:shadow-lg transition"
//               >

//                 <h3 className="text-lg font-semibold text-purple-600 mb-3 break-words">
//                   {note.title || "Untitled Note"}
//                 </h3>


//                 <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-4 break-words">
//                   {note.generatedNotes ||
//                     "No content available"}
//                 </p>


//                 <p className="text-xs text-gray-400 mt-4">
//                   {note.createdAt
//                     ?.toDate()
//                     .toLocaleDateString()}
//                 </p>

//               </div>

//             ))}

//           </div>

//         )}

//       </div>

//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

const Dashboard = () => {
  const [totalNotes, setTotalNotes] = useState(0);
  const [quizzesAttempted, setQuizzesAttempted] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [recentNotes, setRecentNotes] = useState([]);
  const [studyPlan, setStudyPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [latestQuiz, setLatestQuiz] = useState(null);

  const navigate = useNavigate();

  // TOTAL NOTES
  const fetchNotes = () => {
    if (!auth.currentUser) return;

    const notesQuery = query(
      collection(db, "notes"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      notesQuery,
      (snapshot) => {
        setTotalNotes(snapshot.size);
      },
      (error) => {
        console.error("Error fetching notes:", error);
      }
    );

    return unsubscribe;
  };

  // QUIZ RESULTS
  const fetchQuizResults = async () => {
    if (!auth.currentUser) return;

    try {
      const resultsQuery = query(
        collection(db, "quizResults"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(resultsQuery);
      const results = snapshot.docs.map((doc) => doc.data());

      setQuizzesAttempted(results.length);

      if (results.length > 0) {
        const totalPercentage = results.reduce(
          (sum, result) => sum + (result.percentage || 0),
          0
        );

        const highestScore = Math.max(
          ...results.map((result) => result.score || 0)
        );

        setAverageScore(
          Math.round(totalPercentage / results.length)
        );

        setBestScore(highestScore);
      } else {
        setAverageScore(0);
        setBestScore(0);
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  // LATEST QUIZ
  const fetchLatestQuiz = async () => {
    if (!auth.currentUser) return;

    try {
      const quizQuery = query(
        collection(db, "quizResults"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const snapshot = await getDocs(quizQuery);

      if (!snapshot.empty) {
        const quizData = snapshot.docs[0].data();
        setLatestQuiz(quizData);
      } else {
        setLatestQuiz(null);
      }
    } catch (error) {
      console.error("Error fetching latest quiz:", error);
    }
  };

  // RECENT NOTES
  const fetchRecentNotes = async () => {
    if (!auth.currentUser) return;

    try {
      const notesQuery = query(
        collection(db, "notes"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(notesQuery);

      const notes = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);

          return dateB - dateA;
        })
        .slice(0, 3);

      setRecentNotes(notes);
    } catch (error) {
      console.error("Error fetching recent notes:", error);
    }
  };

  // GENERATE STUDY PLAN
  const generateStudyPlan = async () => {
    if (!latestQuiz) {
      alert("Please complete a quiz first.");
      return;
    }

    try {
      setPlanLoading(true);

      const response = await fetch(
        "https://ai-study-notes-generator-ycb3.onrender.com/api/notes/study-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: latestQuiz.score,
            totalQuestions: latestQuiz.totalQuestions,
            incorrectQuestions:
              latestQuiz.incorrectQuestions || [],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to generate study plan");
        return;
      }

      setStudyPlan(data.studyPlan);
    } catch (error) {
      console.error("Error generating study plan:", error);

      alert(
        "Something went wrong while generating your study plan."
      );
    } finally {
      setPlanLoading(false);
    }
  };

  // USE EFFECT
  useEffect(() => {
    const unsubscribe = fetchNotes();

    fetchQuizResults();
    fetchRecentNotes();
    fetchLatestQuiz();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // UI
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-purple-600 mb-1">
              AI STUDY WORKSPACE
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Learning Dashboard
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Organize your study material, test your knowledge and track your progress.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Study Assistant
            </p>

            <p className="font-semibold text-gray-900 dark:text-white">
              AI Powered Learning
            </p>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Study Notes
                </p>

                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {totalNotes}
                </p>
              </div>

              <div className="text-2xl bg-purple-100 dark:bg-purple-950 p-3 rounded-xl">
                📚
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Total notes generated
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quizzes
                </p>

                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {quizzesAttempted}
                </p>
              </div>

              <div className="text-2xl bg-blue-100 dark:bg-blue-950 p-3 rounded-xl">
                📝
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Quizzes attempted
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Average Score
                </p>

                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {averageScore}%
                </p>
              </div>

              <div className="text-2xl bg-green-100 dark:bg-green-950 p-3 rounded-xl">
                📈
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Across all quizzes
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Best Score
                </p>

                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {bestScore}/10
                </p>
              </div>

              <div className="text-2xl bg-yellow-100 dark:bg-yellow-950 p-3 rounded-xl">
                🏆
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Your highest quiz score
            </p>
          </div>

        </div>

        {/* AI STUDY ASSISTANT */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-7 md:p-8 text-white shadow-lg mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <p className="text-purple-200 text-sm font-medium mb-2">
                PERSONALIZED AI ASSISTANT
              </p>

              <h2 className="text-2xl md:text-3xl font-bold">
                Build your personalized study plan
              </h2>

              <p className="text-purple-100 mt-2 max-w-2xl">
                Complete a quiz and let AI analyze your performance,
                identify weak areas and create a focused 5-day study plan.
              </p>
            </div>

            <button
              onClick={generateStudyPlan}
              disabled={planLoading}
              className="bg-white text-purple-700 hover:bg-purple-50 disabled:bg-gray-300 disabled:text-gray-500 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition"
            >
              {planLoading
                ? "Analyzing..."
                : "Generate Study Plan →"}
            </button>

          </div>

        </div>

        {/* STUDY PLAN */}
        {studyPlan && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm mb-8">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 dark:bg-purple-950 p-3 rounded-xl">
                🎯
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Personalized Study Plan
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generated from your latest quiz performance
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                {studyPlan.performance}
              </p>
            </div>

            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
              Areas to Focus On
            </h3>

            <div className="flex flex-wrap gap-2 mb-8">
              {studyPlan.weakAreas.map((area, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>

            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              5-Day Study Plan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {studyPlan.studyPlan.map((day, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition"
                >
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                    {day.day}
                  </p>

                  <h4 className="font-bold text-gray-900 dark:text-white mt-1 mb-3">
                    {day.focus}
                  </h4>

                  <ul className="space-y-2">
                    {day.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        • {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900 rounded-xl p-5">
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                AI Recommendation
              </p>

              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {studyPlan.recommendation}
              </p>
            </div>

          </div>
        )}

        {/* RECENT NOTES */}
        <div className="mb-8">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Study Material
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Continue learning from your recently generated notes.
              </p>
            </div>
          </div>

          {recentNotes.length === 0 ? (

            <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 text-center">

              <div className="text-4xl mb-4">
                📚
              </div>

              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                No study material yet
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Generate your first set of AI-powered notes to get started.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {recentNotes.map((note) => (

                <div
                  key={note.id}
                  onClick={() => navigate(`/notes/${note.id}`)}
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
                >

                  <div className="flex items-start justify-between mb-4">

                    <div className="bg-purple-100 dark:bg-purple-950 p-3 rounded-xl">
                      📄
                    </div>

                    <span className="text-gray-400 group-hover:text-purple-600 transition">
                      →
                    </span>

                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 break-words">
                    {note.title || "Untitled Note"}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-4 break-words">
                    {note.generatedNotes || "No content available"}
                  </p>

                  <div className="border-t border-gray-100 dark:border-gray-800 mt-5 pt-4">
                    <p className="text-xs text-gray-400">
                      {note.createdAt
                        ?.toDate()
                        .toLocaleDateString()}
                    </p>
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;