import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useWebStore from '../../store/web-store'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const actionLogin = useWebStore((state) => state.actionLogin)
  const user = useWebStore((state) => state.username)
  console.log(user)

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success("Login Success")
    } catch (error) {
      console.log(error)
      const errMsg = error.response?.data?.msg
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin")
    } else {
      navigate("/user")
    }
  }

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="hero-content flex-col lg:flex-row-reverse">
        
        {/* Text Section */}
        <div className="text-center lg:text-left text-white max-w-md mb-8 lg:mb-0">
          <h1 className="text-6xl font-extrabold drop-shadow-lg">Welcome Back 👋</h1>
          <p className="py-2 text-xl opacity-90 drop-shadow-lg">
            Please login to continue to <span className="font-semibold">Maow Pao</span>
          </p>
        </div>

        {/* Card Section */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <label className="label font-semibold text-lg">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                placeholder="Enter your username"
                required
              />

              <label className="label font-semibold text-lg">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
                placeholder="Enter your password"
                required
              />

              <div className="flex justify-between text-sm mt-1">
                <a className="link link-hover text-blue-500">Forgot password?</a>
                <a href='/register' className="link link-hover text-purple-500">Register</a>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full">
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
