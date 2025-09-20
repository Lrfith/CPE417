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
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

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
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "manage", element: <Manage /> },
    ]
  },
  {
    path: "/user",
    element: <LayoutUser />,
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