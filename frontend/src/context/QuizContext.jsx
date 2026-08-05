import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [generatedNotes, setGeneratedNotes] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);

  return (
    <QuizContext.Provider
      value={{
        generatedNotes,
        setGeneratedNotes,
        quizQuestions,
        setQuizQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};