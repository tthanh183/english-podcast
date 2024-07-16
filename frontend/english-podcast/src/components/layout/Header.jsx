import React from 'react'

const Header = () => {
  return (
    <div className='p-4 bg-black flex items-center justify-between top-0 left-0'>
        <div className='flex items-center space-x-8 space-y-1'>
            <h1 className='text-[40px] uppercase font-bold text-green-700'>Podcast</h1>
            <nav className='flex items-center space-x-8'>
                <a href='#' className='text-white font-sans text-lg'>Home</a>
                <a href='#' className='text-white font-sans text-lg'>About</a>
                <a href='#' className='text-white font-sans text-lg'>Contact</a>
            </nav>
        </div>
        <div className='flex items-center space-x-4'>
            <input type='text' placeholder='Search' className='p-2 text-black font-sans text-lg'/>
            <button className='p-2 text-white bg-green-500 hover:bg-green-700 font-sans text-lg rounded-md'>Search</button>
        </div>
    </div>
  )
}

export default Header