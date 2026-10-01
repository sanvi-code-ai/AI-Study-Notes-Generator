// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import SetTheme from '../SetTheme'
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import { useNavigate } from "react-router-dom";

// const Header = ({ darkMode, setdarkMode }) => {


//   const navigate = useNavigate();

// const handleLogout = async () => {
//   try {
//     await signOut(auth);
//     navigate("/Auth");
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };

//   return (
//     <header className='border-b border-gray-300 dark:border-gray-700 shadow-lg'>
//       <div className='max-w-7xl mx-auto flex items-center justify-between py-5 px-6'>

//         <h1 className='text-2xl font-bold text-purple-600'>
//           Study Notes AI
//         </h1>

//         <nav className="flex gap-8 font-medium">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) => isActive ? "text-purple-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"}
//             >Dashboard
//           </NavLink>
          
//           <NavLink 
//             to="/" 
//             className={({ isActive }) => 
//               isActive 
//                 ? "text-purple-600 font-semibold" 
//                 : "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
//             }
//           >
//             Notes
//           </NavLink>

//           <NavLink 
//             to="/quiz" 
//             className={({ isActive }) => 
//               isActive 
//                 ? "text-purple-600 font-semibold" 
//                 : "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
//             }
//           >
//             Quiz
//           </NavLink>

//           <NavLink
//           to="/saved-notes"
//           className={({ isActive }) =>isActive? "text-purple-600 font-semibold": "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"}
//           >
//   Your Notes
// </NavLink>

    

//           <NavLink 
//             to="/about" 
//             className={({ isActive }) => 
//               isActive 
//                 ? "text-purple-600 font-semibold" 
//                 : "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
//             }
//           >
//             About
//           </NavLink>
        
//         </nav>

//         <button
//   onClick={handleLogout}
//   className="text-red-500 hover:text-red-600 font-medium"
// >
//   Logout
// </button>

//         <SetTheme darkMode={darkMode} setdarkMode={setdarkMode} />

//       </div>
//     </header>
//   )
// }

// export default Header


import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SetTheme from "../SetTheme";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Header = ({ darkMode, setdarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/Auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between gap-6">

          {/* LOGO */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-bold">
                AI
              </span>
            </div>

            <div className="hidden sm:block text-left">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Study Notes AI
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Intelligent Learning
              </p>
            </div>
          </button>


          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-1">

            <NavLink
              to="/dashboard"
              className={navClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/"
              className={navClass}
            >
              Notes
            </NavLink>

            <NavLink
              to="/quiz"
              className={navClass}
            >
              Quiz
            </NavLink>

            <NavLink
              to="/saved-notes"
              className={navClass}
            >
              Your Notes
            </NavLink>

            <NavLink
              to="/about"
              className={navClass}
            >
              About
            </NavLink>

          </nav>


          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            <button
              onClick={handleLogout}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
            >
              Logout
            </button>

            <SetTheme
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />

          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;