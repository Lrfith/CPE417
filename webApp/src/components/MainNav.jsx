import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useWebStore from '../store/web-store';

const LayoutUser = () => {
  const user = useWebStore((s) => s.username);
  const logout = useWebStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-6">
        {/* Logo */}
        <div className="flex-1 flex items-center gap-3">
          <img src="./IconSAKDEE.png" alt="Logo" className="w-12 h-12" />
          <Link to="/" className="font-bold text-2xl">
            Cat Fire Home
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-none flex items-center gap-4">
          <NavLink className="px-3 py-2 rounded-md" to="/">
            Home
          </NavLink>
          <NavLink className="px-3 py-2 rounded-md" to="/adopt">
            Adopt
          </NavLink>
          <NavLink
            className="px-3 py-2 rounded-md"
            to="https://northsnx.github.io/ExtendX/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ExtendX
          </NavLink>

          {/* ถ้า user ยังไม่ login */}
          {!user && (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
                }
                to="/register"
              >
                Register
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
                }
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}

          {/* ถ้า user login */}
          {user && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:bg-gray-100 px-2 py-3 rounded-md"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://cdn3d.iconscout.com/3d/premium/preview/worker-avatar-3d-icon-png-download-5187863.png?f=webp&h=1400"
                  alt="User Avatar"
                />
                <ChevronDown />
              </button>

              {isOpen && (
                <div className="absolute right-0 top-16 bg-white shadow-md rounded-md z-50">
                  <Link
                    to="/user"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    User
                  </Link>
                  <Link
                    to="/user/history"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    History
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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
  );
};

export default LayoutUser;
