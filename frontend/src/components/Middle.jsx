import React from 'react'

const Middle = () => {
  return (
    <div className='flex flex-row gap-4 h-80 m-8'>
        <div className='w-2/3 bg-white dark:bg-black border-2 border-black dark:border-white overflow-auto rounded-xl'>
            <div>
                <h1>Your Notes</h1>
                <p>paste or type your notes here</p>
            </div>
        </div>
        <div className='w-2/3 bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl overflow-auto'></div>
    </div>
  )
}

export default Middle