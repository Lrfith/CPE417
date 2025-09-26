import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <nav className="navbar bg-white/40 backdrop-blur-md shadow-md sticky top-0 z-50 px-15 ">

        <div className="flex-1 flex items-center">
          <img src='./IconSAKDEE.png' alt="Logo" className="w-12 h-12" />
          <a href="/" className="font-bold text-3xl text-ิสฟแา">Maow Pao</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-5 gap-5 items-center text-lg">
            <li><a href="/">Home</a></li>
            <li><a href="/adopt">Adopt</a></li>
            <li><a href="https://northsnx.github.io/ExtendX/" target="_blank" rel="noopener noreferrer">ExtendX</a></li>
            <a href='/register'><button className="btn ">Register</button></a>
            <a href='/login'><button className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold px-6">Login</button></a>
            <div className="avatar w-10 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </ul>
        </div>
      </nav>

      {/* Floating Ad Section */}
      <div className="fixed bottom-5 right-5 bg-black/80 text-center p-4 rounded-lg shadow-lg border border-cyan-400 animate-blink z-50">
        <p className="text-m mb-2 text-gray-600">Ads space for ExtendX </p>
        <img
          src="src/assets/img/unnamed.png"
          alt="ads"
          className="mx-auto w-70"
        />
      </div>


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

export default Layout