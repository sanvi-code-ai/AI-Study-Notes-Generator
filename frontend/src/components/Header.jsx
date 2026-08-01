import React from 'react'
import { NavLink } from 'react-router-dom'
import SetTheme from '../SetTheme'

const Header = ({ darkMode, setdarkMode }) => {
  return (
    <header className='border-b border-gray-300 dark:border-gray-700 shadow-lg'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-5 px-6'>

        <h1 className='text-2xl font-bold text-purple-600'>
          Study Notes AI
        </h1>

        <nav className="flex gap-8 font-medium">
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

        <SetTheme darkMode={darkMode} setdarkMode={setdarkMode} />

      </div>
    </header>
  )
}

export default Header