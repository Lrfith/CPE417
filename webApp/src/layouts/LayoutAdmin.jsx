import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderAdmin from '../components/admin/HeaderAdmin'

const LayoutAdmin = () => {
  return (
    <div>
        <SidebarAdmin/>
        <HeaderAdmin/>
        <hr/>
        <Outlet/>
    </div>
  )
}

export default LayoutAdmin