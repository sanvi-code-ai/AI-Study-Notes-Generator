import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";


const SavedNoteDetails = () => {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const docRef = doc(db, "notes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNote({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (!note) {
    return <h2 className="text-center mt-10">Note not found.</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Link
        to="/saved-notes"
        className="text-purple-600 hover:underline"
      >
        ← Back to Your Notes
      </Link>

      <h1 className="text-3xl font-bold text-purple-600 mt-6 mb-6">
        {note.title}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{note.generatedNotes}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SavedNoteDetails;