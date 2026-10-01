// // import React, { useEffect, useState } from "react";
// // import { db } from "../firebase/firebase";
// // import { collection, getDocs , deleteDoc , doc, } from "firebase/firestore";
// // import { useNavigate } from "react-router-dom";
// // import { auth } from "../firebase/firebase";
// // import { query, where } from "firebase/firestore";

// // const SavedNotes = () => {

// //     const [notes, setNotes] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [selectedNote, setSelectedNote] = useState(null);
// //     const navigate = useNavigate();

// //     const fetchNotes = async () => {
// //   try {
// //     const notesQuery = query(
// //       collection(db, "notes"),
// //       where("userId", "==", auth.currentUser.uid)
// //     );

// //     const querySnapshot = await getDocs(notesQuery);

// //     const notesArray = querySnapshot.docs.map((doc) => ({
// //       id: doc.id,
// //       ...doc.data(),
// //     }));

// //     setNotes(notesArray);
// //   } catch (error) {
// //     console.error(error);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// // const handleDelete = async (id) => {
// //   const confirmDelete = window.confirm("Are you sure you want to delete this note?");
// //   if (!confirmDelete) return;

// //   try {
// //     await deleteDoc(doc(db, "notes", id));

// //     setNotes((prevNotes) =>
// //       prevNotes.filter((note) => note.id !== id)
// //     );
// //   } 
// //   catch (error) {
// //     console.error(error);
// //     alert("Failed to delete note.");
// //   }
// // };
    
// //     useEffect(() => {
// //         fetchNotes();
// //     }, []);

// //     if (loading) {
// //         return (
// //         <div className="max-w-6xl mx-auto p-8">
// //             <h2 className="text-xl font-semibold">Loading notes...</h2>
// //         </div>
// //     );
// // }

// //   return (
// //     <div className="max-w-6xl mx-auto p-8">
// //     <h1 className="text-3xl font-bold text-purple-600 mb-6">
// //       Your Notes
// //     </h1>

// //     {loading ? (
// //       <p className="text-gray-500 dark:text-gray-400">
// //         Loading...
// //       </p>
// //     ) : notes.length === 0 ? (
// //       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
// //         <p className="text-gray-500 dark:text-gray-400">
// //           No saved notes found.
// //         </p>
// //       </div>
// //     ) : (
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {notes.map((note) => (
// //           <div
// //             key={note.id}
// //             onClick={() => navigate(`/notes/${note.id}`)}
// //             className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
// //           >
// //             <h2 className="text-xl font-bold text-purple-600 mb-3">
// //               {note.title}
// //             </h2>

// //             <p className="text-gray-600 dark:text-gray-300 line-clamp-4 whitespace-pre-wrap">
// //               {note.generatedNotes}
// //             </p>

// //             <p className="text-xs text-gray-400 mt-4">
// //               {note.createdAt?.toDate().toLocaleString()}
// //             </p>

// //             <button
// //             onClick={(e) => {e.stopPropagation(); handleDelete(note.id);}}
// //             className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
// //             >
// //                 Delete
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     )}
// //   </div>
// //   );
// // };

// // export default SavedNotes;


// import React, { useEffect, useState } from "react";
// import { db, auth } from "../firebase/firebase";
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   query,
//   where,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const SavedNotes = () => {
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const fetchNotes = async () => {
//     try {
//       const notesQuery = query(
//         collection(db, "notes"),
//         where("userId", "==", auth.currentUser.uid)
//       );

//       const querySnapshot = await getDocs(notesQuery);

//       const notesArray = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setNotes(notesArray);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this note?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await deleteDoc(doc(db, "notes", id));

//       setNotes((prevNotes) =>
//         prevNotes.filter((note) => note.id !== id)
//       );
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete note.");
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-6 py-12">
//         <div className="max-w-6xl mx-auto">

//           <div className="animate-pulse">
//             <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>

//             <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded mb-3"></div>

//             <div className="h-4 w-96 max-w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
//           </div>

//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-6 py-10">

//       <div className="max-w-6xl mx-auto">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

//           <div>

//             <div className="flex items-center gap-2 mb-3">
//               <span className="w-2 h-2 rounded-full bg-purple-600"></span>

//               <span className="text-xs font-semibold tracking-widest text-purple-600 uppercase">
//                 Study Library
//               </span>
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
//               Your Notes
//             </h1>

//             <p className="text-slate-500 dark:text-slate-400 mt-3">
//               Access and review all your saved AI-generated study material.
//             </p>

//           </div>

//           <div className="flex items-center gap-3">

//             <div className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
//               <p className="text-xs text-slate-400 uppercase tracking-wide">
//                 Saved Notes
//               </p>

//               <p className="text-xl font-bold text-purple-600 mt-1">
//                 {notes.length}
//               </p>
//             </div>

//             <button
//               onClick={() => navigate("/notes")}
//               className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
//             >
//               + Create Note
//             </button>

//           </div>

//         </div>

//         {/* Empty State */}
//         {notes.length === 0 ? (

//           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">

//             <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">

//               <svg
//                 className="w-8 h-8 text-purple-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1.8"
//                   d="M12 6v12m6-6H6"
//                 />
//               </svg>

//             </div>

//             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
//               Your study library is empty
//             </h2>

//             <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto">
//               Generate your first set of AI-powered notes and save them here
//               for quick access later.
//             </p>

//             <button
//               onClick={() => navigate("/notes")}
//               className="mt-7 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
//             >
//               Create Your First Note
//             </button>

//           </div>

//         ) : (

//           /* Notes Grid */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {notes.map((note) => (

//               <div
//                 key={note.id}
//                 className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
//               >

//                 {/* Card top */}
//                 <div className="p-6">

//                   <div className="flex items-start justify-between gap-4 mb-5">

//                     <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">

//                       <svg
//                         className="w-5 h-5 text-purple-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="1.8"
//                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l5 5v11a2 2 0 01-2 2z"
//                         />
//                       </svg>

//                     </div>

//                     <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
//                       AI Notes
//                     </span>

//                   </div>

//                   <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2">
//                     {note.title}
//                   </h2>

//                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-4 leading-relaxed whitespace-pre-wrap">
//                     {note.generatedNotes}
//                   </p>

//                   <div className="flex items-center gap-2 mt-5 text-xs text-slate-400">

//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1.8"
//                         d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>

//                     {note.createdAt?.toDate().toLocaleString()}

//                   </div>

//                 </div>

//                 {/* Card actions */}
//                 <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">

//                   <button
//                     onClick={() => navigate(`/notes/${note.id}`)}
//                     className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition"
//                   >
//                     Open Note →
//                   </button>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(note.id);
//                     }}
//                     className="text-sm font-medium text-slate-400 hover:text-red-500 transition"
//                   >
//                     Delete
//                   </button>

//                 </div>

//               </div>

//             ))}

//           </div>

//         )}

//       </div>

//     </div>
//   );
// };

// export default SavedNotes;


import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "notes", id));

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete note.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
            <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded mb-3"></div>
            <div className="h-4 w-96 max-w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>

              <span className="text-xs font-semibold tracking-widest text-purple-600 uppercase">
                Study Library
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Your Notes
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-3">
              Access and review all your saved AI-generated study material.
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Saved Notes
              </p>

              <p className="text-xl font-bold text-purple-600 mt-1">
                {notes.length}
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
            >
              + Create Note
            </button>

          </div>
        </div>

        {notes.length === 0 ? (

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">

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
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Your study library is empty
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto">
              Generate your first set of AI-powered notes and save them here
              for quick access later.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-7 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
            >
              Create Your First Note
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {notes.map((note) => (

              <div
                key={note.id}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >

                <div className="p-6">

                  <div className="flex items-start justify-between gap-4 mb-5">

                    <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">

                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l5 5v11a2 2 0 01-2 2z"
                        />
                      </svg>

                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      AI Notes
                    </span>

                  </div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2">
                    {note.title}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-4 leading-relaxed whitespace-pre-wrap">
                    {note.generatedNotes}
                  </p>

                  <div className="flex items-center gap-2 mt-5 text-xs text-slate-400">

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    {note.createdAt?.toDate().toLocaleString()}

                  </div>

                </div>

                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">

                  <button
                    onClick={() => navigate(`/notes/${note.id}`)}
                    className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition"
                  >
                    Open Note →
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                    className="text-sm font-medium text-slate-400 hover:text-red-500 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
};

export default SavedNotes;