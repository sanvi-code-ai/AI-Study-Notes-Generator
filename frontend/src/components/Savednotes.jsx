import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs , deleteDoc , doc, } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { query, where } from "firebase/firestore";

const SavedNotes = () => {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState(null);
    const navigate = useNavigate();

    const fetchNotes = async () => {
  try {
    const notesQuery = query(
      collection(db, "notes"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(notesQuery);

    const notesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotes(notesArray);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this note?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "notes", id));

    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );
  } 
  catch (error) {
    console.error(error);
    alert("Failed to delete note.");
  }
};
    
    useEffect(() => {
        fetchNotes();
    }, []);

    if (loading) {
        return (
        <div className="max-w-6xl mx-auto p-8">
            <h2 className="text-xl font-semibold">Loading notes...</h2>
        </div>
    );
}

  return (
    <div className="max-w-6xl mx-auto p-8">
    <h1 className="text-3xl font-bold text-purple-600 mb-6">
      Your Notes
    </h1>

    {loading ? (
      <p className="text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    ) : notes.length === 0 ? (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-gray-500 dark:text-gray-400">
          No saved notes found.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => navigate(`/notes/${note.id}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            <h2 className="text-xl font-bold text-purple-600 mb-3">
              {note.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 line-clamp-4 whitespace-pre-wrap">
              {note.generatedNotes}
            </p>

            <p className="text-xs text-gray-400 mt-4">
              {note.createdAt?.toDate().toLocaleString()}
            </p>

            <button
            onClick={(e) => {e.stopPropagation(); handleDelete(note.id);}}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
                Delete
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default SavedNotes;