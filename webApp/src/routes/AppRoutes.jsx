import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from '../pages/Home'
import Adopt from '../pages/Adopt'
import Rehome from '../pages/Rehome'
import History from '../pages/History'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmin'
import LayoutUser from '../layouts/LayoutUser'

import Dashboard from '../pages/admin/Dashboard'
import HomeUser from '../pages/user/HomeUser'
import Manage from '../pages/admin/Manage'
import InfoCat from '../pages/admin/InfoCat'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ProtecRouteUser from './ProtecRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import Adoption from '../pages/admin/Adoption'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/adopt", element: <Adopt /> },
      { path: "/rehome", element: <Rehome /> },
      { path: "/history", element: <History /> },
      { path: "/login", element: <Login/> },
      { path: "/register", element: <Register/> },
    ]
  },
  {
    path: "/admin",
    // element: <LayoutAdmin />,
    element: <ProtectRouteAdmin element={<LayoutAdmin/>}/>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "manage", element: <Manage /> },
      { path: "request", element: <Adoption/> },
      { path: "infoCat", element: <InfoCat /> }
    ]
  },
  {
    path: "/user",
    // element: <LayoutUser />,
    element: <ProtecRouteUser element={<LayoutUser/>} />,
    children: [
      { index: true, element: <HomeUser /> },
    ]
  }

])

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes