import React from 'react'

const MainNav = () => {
  return (
    <nav>
        <div>

            <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a href="/" className="textarea-ghost textarea-xl px-5">PetHub</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-5 gap-5 ">
            <li><a Link to="/adopt">Adopt</a></li>
            <li><a href="/rehome">Rehome</a></li>
            <li><a href="/register">Register</a></li>
            <a href='/login'><button className="btn btn-active">Login</button></a>
          </ul>
        </div>
      </div>
        </div>
    </nav>
  )
}

export default MainNav