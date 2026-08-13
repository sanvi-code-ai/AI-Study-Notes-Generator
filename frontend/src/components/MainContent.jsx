import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import React, { useState } from 'react';
import { jsPDF } from "jspdf"; 
import ReactMarkdown from "react-markdown";
import {db} from "../firebase/firebase";
import { collection , addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";


const MainContent = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false); 
  const [copied, setCopied] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const navigate = useNavigate();
 const { setGeneratedNotes, setQuizQuestions } = useContext(QuizContext);

  const wordCount = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
  const charCount = inputText.length;

  const handleClear = () => {
    setInputText('');
  };

  const handleGenerate = async () => {
    if (inputText.trim() === '') {
      alert('Please enter some text first!'); 
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch("https://ai-study-notes-generator-ycb3.onrender.com/api/notes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutputText(data.studyNotes);
        setGeneratedNotes(data.studyNotes);
      } else {
        alert(data.message || "Failed to generate notes");
      }
    } catch (error) {
       console.error(error);
       alert("Something went wrong connecting to the backend");
    } finally {
      setLoading(false);
    }
  };

  const handlePDFChange = (e) => {
  setSelectedPDF(e.target.files[0]);
};

const handlePDFUpload = async () => {
  if (!selectedPDF) {
    alert("Please select a PDF first!");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("pdf", selectedPDF);

    const response = await fetch("https://ai-study-notes-generator-ycb3.onrender.com/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      setOutputText(data.studyNotes);
      setGeneratedNotes(data.studyNotes);
    } else {
      alert(data.message || "Failed to generate notes from PDF");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while uploading the PDF");
  } finally {
    setLoading(false);
  }
};

const handleTakeQuiz = async () => {
  if (!outputText) {
    alert("Please generate study notes first!");
    return;
  }

  try {
    const response = await fetch("https://ai-study-notes-generator-ycb3.onrender.com/api/notes/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notes: outputText,
      }),
    });

    const data = await response.json();
    setQuizQuestions(data.quiz);
    navigate("/quiz");

    

    navigate("/quiz");
  } catch (error) {
    console.error(error);
    alert("Failed to generate quiz.");
  }
};

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const HandlePDF = () => {
    if (!outputText) return;

    const doc = new jsPDF(); 

    doc.setFont("helvetica", "bold"); 
    doc.setFontSize(18);
    doc.text("AI Generated Study Notes", 10, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const splitText = doc.splitTextToSize(outputText, 180);
    doc.text(splitText, 10, 35);
    doc.save("study-notes.pdf");
  };

  const handleSaveNotes = async () => {
  if (!outputText) {
    alert("Generate notes first!");
    return;
  }

  try {
    await addDoc(collection(db, "notes"), {
      title: inputText.split("\n")[0] || "Untitled Notes",
      inputText: inputText,
      generatedNotes: outputText,
      createdAt: new Date(),
      userId: auth.currentUser.uid,
    });

    alert("Notes saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to save notes.");
  }
};

  return (
    <main className="pb-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto pt-8">
        
        
        <div className="flex text-center flex-col mb-8">
          <h1 className="font-bold text-3xl md:text-4xl text-purple-600 dark:text-purple-400 py-2">
            AI Study Notes Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Paste your notes and let AI turn them into structured study notes
          </p>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-[480px] transition-colors duration-300">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Your Notes</span>
              <button 
                onClick={handleClear} 
                className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-950 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 px-3 py-1 rounded transition-colors"
              >
                Clear
              </button>
            </div>

            <div className="mb-4">
  <label className="block text-sm  font-bold text-gray-700 dark:text-gray-300 mb-2">
    Upload PDF
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={handlePDFChange}
    className="w-full text-sm text-gray-700 dark:text-gray-300"
  />

  {selectedPDF && (
    <p className="text-xs text-green-600 mt-2">
      Selected: {selectedPDF.name}
    </p>
  )}
</div>

            <textarea 
              className="flex-1 w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm transition-colors" 
              placeholder="Paste or type your notes here.."
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)}
            />

            <div className="mt-3">
              <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>Words: <b>{wordCount}</b></span>
                <span>Characters: <b>{charCount}</b></span>
              </div>

              <button 
                onClick={handleGenerate} 
                disabled={loading} 
                className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all ${
                  loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
                }`}
              >
                {loading ? 'Generating... Please wait' : 'Generate Study Notes'}
              </button>
              <button
              onClick={handlePDFUpload}
              disabled={loading}
              className={`mt-3 w-full py-2.5 rounded-lg font-semibold text-white transition-all ${
                loading
                ? "bg-emerald-400 cursor-not-allowed": "bg-emerald-600 hover:bg-emerald-700 active:scale-95"}`}>
                  {loading ? "Uploading..." : "Generate Notes from PDF"}
                </button>

                <button
                onClick={handleTakeQuiz}
                className="mt-3 w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all">
                Take Quiz
                </button>

            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-[480px] transition-colors duration-300">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                Generated Study Notes
              </span>
              
              {outputText && (
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopy}
                    className="text-xs bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-3 py-1 rounded hover:bg-purple-200 transition-colors"
                  >
                    {copied ? 'Copied! ✓' : 'Copy Notes'}
                  </button>
                  <button 
                    onClick={HandlePDF} 
                    className='text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors'
                  >
                    PDF
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                  >Save Notes</button>

                  
                </div>
              )}
            </div>

            <div className="flex-1 w-full p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-lg overflow-y-auto text-gray-800 dark:text-gray-200 text-sm transition-colors">
              {outputText ? (
                <div className="prose dark:prose-invert max-w-none text-sm">
                  <ReactMarkdown>{outputText}</ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-gray-400 dark:text-gray-500 text-sm">
                  <span>Your AI-generated notes will appear here.</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default MainContent;