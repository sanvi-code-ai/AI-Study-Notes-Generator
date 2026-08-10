import { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const MiddleQuiz = () => {
  const { quizQuestions } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const currentQuiz = quizQuestions[currentQuestion];
  const quizFinished = currentQuestion === quizQuestions.length;

if (quizQuestions.length === 0) {
  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold">
        No quiz available.
      </h2>

      <p className="text-gray-500 mt-2">
        Please generate notes first.
      </p>
    </div>
  );
}


if (quizFinished) {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center">

      <h1 className="text-4xl font-bold text-purple-600 mb-6">
        🎉 Quiz Completed!
      </h1>

      <p className="text-2xl mb-4">
        Your Score
      </p>

      <p className="text-5xl font-bold text-green-600 mb-8">
        {score} / {quizQuestions.length}
      </p>

      <button
        onClick={() => {
          setCurrentQuestion(0);
          setScore(0);
          setSelectedAnswer("");
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
      >
        Restart Quiz
      </button>

    </div>
  );
}

const saveQuizResult = async () => {
  try {
    await addDoc(collection(db, "quizResults"), {
      score,
      totalQuestions: quizQuestions.length,
      percentage: Math.round((score / quizQuestions.length) * 100),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-8">

    <h1 className="text-3xl font-bold text-purple-600 mb-8">
      Interactive Quiz
    </h1>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">

      <p className="text-sm text-gray-500 mb-4">
        Question {currentQuestion + 1} of {quizQuestions.length}
      </p>

      <h2 className="text-2xl font-semibold mb-8">
        {currentQuiz.question}
      </h2>

      <div className="space-y-4">
        {currentQuiz.options.map((option, index) => (
          <button
          key={index} onClick={() => {
  if (selectedAnswer) return;

  setSelectedAnswer(option);

  if (option === currentQuiz.answer) {
    setScore((prev) => prev + 1);
  }
}}
            className={`w-full text-left p-4 border rounded-lg transition ${
              selectedAnswer === option? option === currentQuiz.answer? "bg-green-500 text-white": "bg-red-500 text-white": "hover:bg-purple-100 dark:hover:bg-purple-900"
              }`}>{option}
          </button>

        ))}
      </div>

      <div className="flex justify-between items-center mt-8">

  <p className="font-semibold text-purple-600">
    Score: {score}
  </p>

  <button
    disabled={!selectedAnswer}
    onClick={async () => {
  setSelectedAnswer("");

  if (currentQuestion < quizQuestions.length - 1) {
    setCurrentQuestion((prev) => prev + 1);
  } else {
  await saveQuizResult();
  setCurrentQuestion(quizQuestions.length);
}
}}
    className={`px-6 py-2 rounded-lg text-white ${
      selectedAnswer
        ? "bg-purple-600 hover:bg-purple-700"
        : "bg-gray-400 cursor-not-allowed"
    }`}
  >
    Next Question
  </button>

</div>

    </div>

  </div>
  )
};

export default MiddleQuiz;