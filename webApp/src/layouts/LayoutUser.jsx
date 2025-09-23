import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'

const LayoutUser = () => {
  return (

    <div>
      <MainNav>
        <Outlet />

      </MainNav>
    </div>
  )
}


export default LayoutUser