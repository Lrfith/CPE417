import React from 'react'

const Login = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Text Section */}
        <div className="text-center lg:text-left text-white max-w-md mb-8 lg:mb-0">
          <h1 className="text-6xl font-extrabold drop-shadow-lg">Welcome Back 👋</h1>
          <p className="py- text-xl opacity-90 drop-shadow-lg">
            Please login to continue to <span className="font-semibold">Maow Pao</span>
          </p>
        </div>

        {/* Card Section */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-xl">
          <div className="card-body">
            <fieldset className="fieldset space-y-4">
              <label className="label font-semibold text-lg">Email</label>
              <input 
                type="email" 
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" 
                placeholder="Enter your email" 
              />

              <label className="label font-semibold text-lg">Password</label>
              <input 
                type="password" 
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg" 
                placeholder="Enter your password" 
              />

              <div className="flex justify-between text-sm mt-1">
                <a className="link link-hover text-blue-500">Forgot password?</a>
                <a href='/register' className="link link-hover text-purple-500">Register</a>
              </div>

              {/* Submit Button */}
              <a href="/user" className="btn btn-primary btn-lg">เข้าสู่ระบบ</a>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
