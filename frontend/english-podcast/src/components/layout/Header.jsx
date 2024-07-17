import React from 'react'

import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <div className='p-3 bg-black flex items-center justify-between'>
        <div className='flex items-center space-x-8'>
            <h1 className='text-[40px] uppercase font-bold text-red-900'>Podcast</h1>
            <nav className='flex items-center space-x-8'>
                <a href='#' className='text-white font-sans text-lg'>Home</a>
                <a href='#' className='text-white font-sans text-lg'>About</a>
                <a href='#' className='text-white font-sans text-lg'>Contact</a>
            </nav>
        </div>
        <div className='flex items-center space-x-4'>
            {/* <input type='text' placeholder='Search' className='p-2 text-black font-sans text-base'/>
            <button className='p-2 text-white bg-red-500 hover:bg-red-700 font-sans text-lg rounded-md'>Search</button> */}
            <Link to={'/login'} className='p-2 text-white bg-red-700 hover:bg-red-900 font-sans text-lg rounded-md'>Login</Link>
        </div>
    </div>
  )
}

export default Header