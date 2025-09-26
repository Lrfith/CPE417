import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
      <div className="flex flex-col min-h-screen ">
  
        {/* Navbar */}
        <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-15 ">
  
          <div className="flex-1 flex items-center">
            <img src='./IconSAKDEE.png' alt="Logo" className="w-12 h-12" />
            <a href="/" className="font-bold text-3xl">Maow Pao</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-5 gap-5 items-center text-lg">
              <li><a href="/">Home</a></li>
              <li><a href="/adopt">Adopt</a></li>
              <li><a href="https://northsnx.github.io/ExtendX/" target="_blank" rel="noopener noreferrer">ExtendX</a></li>
              <a href='/login'><button className="btn btn-error text-white ">Log Out</button></a>
            </ul>
          </div>
        </nav>
  
  
  
        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
  
        {/* Footer */}
  
        <footer className="footer bg-neutral text-neutral-content p-5 flex justify-center items-center">
          <p className="text-center">
            ExtendX Developer &copy; 2025 - All rights reserved
          </p>
        </footer>
  
      </div>
    )
}

export default LayoutUser