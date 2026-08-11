import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
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




  const fetchLatestQuiz = async () => {
  try {
    const quizQuery = query(
      collection(db, "quizResults"),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const snapshot = await getDocs(quizQuery);

    if (!snapshot.empty) {
      const quizData = snapshot.docs[0].data();
      setLatestQuiz(quizData);
    }

  } catch (error) {
    console.error("Error fetching latest quiz:", error);
  }
};

  const fetchQuizResults = async () => {
    try {
      const snapshot = await getDocs(collection(db, "quizResults"));

      const results = snapshot.docs.map((doc) => doc.data());

      setQuizzesAttempted(results.length);

      if (results.length > 0) {
        const totalPercentage = results.reduce(
          (sum, result) => sum + result.percentage,
          0
        );

        const highestScore = Math.max(
          ...results.map((result) => result.score)
        );

        setAverageScore(
          Math.round(totalPercentage / results.length)
        );

        setBestScore(highestScore);
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  const fetchRecentNotes = async () => {
    try {
      const notesQuery = query(
        collection(db, "notes"),
        orderBy("createdAt", "desc"),
        limit(3)
      );

      const snapshot = await getDocs(notesQuery);

      const notes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecentNotes(notes);
    } catch (error) {
      console.error("Error fetching recent notes:", error);
    }
  };

  const generateStudyPlan = async () => {
  try {
    setPlanLoading(true);

    // Make sure a quiz has been attempted
    if (!latestQuiz) {
      alert("Please complete a quiz first.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/notes/study-plan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: latestQuiz.score,
          totalQuestions: latestQuiz.totalQuestions,
          incorrectQuestions: latestQuiz.incorrectQuestions || [],
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
    alert("Something went wrong while generating your study plan.");
  } finally {
    setPlanLoading(false);
  }
};
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "notes"));
        setTotalNotes(snapshot.size);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
    fetchQuizResults();
    fetchRecentNotes();
    fetchLatestQuiz();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 w-full">

      
      <h1 className="text-4xl font-bold text-purple-600 mb-2">
        Learning Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Track your study progress and performance.
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-gray-500">
            Total Notes
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            {totalNotes}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-gray-500">
            Quizzes Attempted
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            {quizzesAttempted}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-gray-500">
            Average Score
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            {averageScore}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-gray-500">
            Best Score
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            {bestScore}/10
          </p>
        </div>

      </div>

      <div className="mt-10">
  <button
    onClick={generateStudyPlan}
    disabled={planLoading}
    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
  >
    {planLoading
      ? "Creating Your Study Plan..."
      : "🎯 Generate My Study Plan"}
  </button>
</div>
{studyPlan && (
  <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

    <h2 className="text-2xl font-bold text-purple-600 mb-4">
      🎯 Your Personalized Study Plan
    </h2>

    <p className="text-gray-600 dark:text-gray-300 mb-6">
      {studyPlan.performance}
    </p>

    <h3 className="text-xl font-semibold mb-3">
      Weak Areas
    </h3>

    <ul className="list-disc ml-6 mb-6">
      {studyPlan.weakAreas.map((area, index) => (
        <li key={index}>
          {area}
        </li>
      ))}
    </ul>

    <h3 className="text-xl font-semibold mb-4">
      5-Day Study Plan
    </h3>

    <div className="space-y-4">
      {studyPlan.studyPlan.map((day, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          <h4 className="font-bold text-purple-600">
            {day.day} — {day.focus}
          </h4>

          <ul className="list-disc ml-6 mt-2">
            {day.tasks.map((task, taskIndex) => (
              <li key={taskIndex}>
                {task}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
      <strong>AI Recommendation:</strong>
      <p className="mt-1">
        {studyPlan.recommendation}
      </p>
    </div>

  </div>
)}

  
      <div className="mt-10 w-full">

        <h2 className="text-2xl font-bold mb-6">
          Recent Notes
        </h2>

        {recentNotes.length === 0 ? (

          <p className="text-gray-500">
            No saved notes yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {recentNotes.map((note) => (

              <div
                key={note.id}
                 onClick={() => navigate(`/notes/${note.id}`)}
                className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 w-full"
              >

                <h3 className="text-lg font-semibold text-purple-600 mb-3 break-words">
                  {note.title || "Untitled Note"}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-4 break-words">
                  {note.generatedNotes || "No content available"}
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  {note.createdAt?.toDate().toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;