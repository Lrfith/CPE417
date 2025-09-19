import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutUser = () => {
  return (
    <div>
        <h1>Layout User Component</h1>
        <hr/>
        <Outlet />
    </div>
  )
}

export default LayoutUser