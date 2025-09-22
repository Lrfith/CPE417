import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, LogOut, SquareLibrary, FileSliders } from 'lucide-react';

const SidebarAdmin = () => {
  return (
    <div className='bg-gray-800 w-64 text-gray-100 flex flex-col h-screen'>

      <div className='h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold'>
        Admin Panel
      </div>

      <nav className='flex-1 px-4 py-4 space-y-2'>
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <LayoutDashboard className="mr-4" />
          Dashboard
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <FileSliders className="mr-4" />
          Manage
        </NavLink>

        <NavLink
          to={"request"}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <FileSliders className="mr-4" />
          Adoption Request
        </NavLink>
        
        <NavLink
          to={"infoCat"}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <SquareLibrary className="mr-4" />
          Infomation Cat
        </NavLink>

      </nav>

      <div>
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          <LogOut  className="mr-4" />
          Logout
        </NavLink>
      </div>
    </div>
  )
}

export default SidebarAdmin