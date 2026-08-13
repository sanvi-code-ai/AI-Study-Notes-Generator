import React from 'react'
import { NavLink } from 'react-router-dom'
import SetTheme from '../SetTheme'
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

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

  return (
    <header className='border-b border-gray-300 dark:border-gray-700 shadow-lg'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-5 px-6'>

        <h1 className='text-2xl font-bold text-purple-600'>
          Study Notes AI
        </h1>

        <nav className="flex gap-8 font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive ? "text-purple-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"}
            >Dashboard
          </NavLink>
          
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "text-purple-600 font-semibold" 
                : "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            }
          >
            Notes
          </NavLink>

          <NavLink 
            to="/quiz" 
            className={({ isActive }) => 
              isActive 
                ? "text-purple-600 font-semibold" 
                : "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            }
          >
            Quiz
          </NavLink>

          <NavLink
          to="/saved-notes"
          className={({ isActive }) =>isActive? "text-purple-600 font-semibold": "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"}
          >
  Your Notes
</NavLink>

    

          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive 
                ? "text-purple-600 font-semibold" 
                : "text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            }
          >
            About
          </NavLink>
        
        </nav>

        <button
  onClick={handleLogout}
  className="text-red-500 hover:text-red-600 font-medium"
>
  Logout
</button>

        <SetTheme darkMode={darkMode} setdarkMode={setdarkMode} />

      </div>
    </header>
  )
}

export default Header