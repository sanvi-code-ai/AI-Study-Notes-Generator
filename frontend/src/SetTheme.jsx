import React from 'react'

function SetTheme({ darkMode , setdarkMode}){
    return(
        <button onClick={()=> setdarkMode(!darkMode)}
                className='px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors'>
                   {darkMode ? " Light" : " Dark"} 
                </button>
    );
}

export default SetTheme;