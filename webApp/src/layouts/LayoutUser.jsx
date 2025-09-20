import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    
    <div>

      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a href="/" className="textarea-ghost textarea-xl px-5">PetHub</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-5 gap-5 ">
            <li><a href="/adopt">Adopt</a></li>
            <li><a href="/rehome">Rehome</a></li>
          </ul>
        </div>
      </div>

      <Outlet />

    </div>
  )
}


export default LayoutUser