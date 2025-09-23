import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useWebStore from '../store/web-store';

const MainNav = () => {
  const user = useWebStore((s) => s.username);
  const logout = useWebStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm relative px-4">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="textarea-ghost textarea-xl px-5">
            PetHub
          </Link>
        </div>

        {/* Navigation links */}
        <div className="flex-none flex items-center gap-4">
          <NavLink className="px-3 py-2 rounded-md" to="/adopt">
            Adopt
          </NavLink>
          <NavLink className="px-3 py-2 rounded-md" to="/rehome">
            Rehome
          </NavLink>

          {/* ถ้า user ไม่ login */}
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
                    to="/user/history"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    History
                  </Link>
                  <button
                    onClick={()=>{logout()}}
                    
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
