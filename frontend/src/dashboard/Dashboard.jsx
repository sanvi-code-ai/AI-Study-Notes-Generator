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
  const navigate = useNavigate();

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
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 w-full">

      {/* Dashboard Header */}
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