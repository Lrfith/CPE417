import React, { useState } from 'react'
import { Mail, Lock, User, Home } from "lucide-react"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    // ส่งข้อมูลไป backend หรือ API
    console.log("Register Data:", formData)
    alert("Register success!")
  }

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Text Section */}
        <div className="text-center lg:text-left text-white max-w-md mb-8 lg:mb-0">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">Create Account ✨</h1>
          <p className="py-4 text-lg opacity-90">
            Join <span className="font-semibold">Maow Pao</span> today and explore more!
          </p>
        </div>

        {/* Card Section */}
        <div className="card w-full max-w-sm shrink-0 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg" 
                  placeholder="Full Name" 
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" 
                  placeholder="Email" 
                  required
                />
              </div>

              {/* Address */}
              <div className="relative">
                <Home className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg" 
                  placeholder="Address" 
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg" 
                  placeholder="Password" 
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-lg" 
                  placeholder="Confirm Password" 
                  required
                />
              </div>

              {/* Submit */}
              <button 
                type="submit" 
                className="btn w-full mt-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white shadow-lg hover:opacity-90"
              >
                Register
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-white mt-3">
                Already have an account?{" "}
                <a href="/login" className="link link-hover text-blue-200">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
