import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useWebStore from '../../store/web-store'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const actionLogin = useWebStore((state)=>state.actionLogin)
  const user = useWebStore((state)=>state.username)
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

  const roleRedirect = (role) =>{
    if(role == "admin"){
      navigate("/admin")
    } else {
      navigate("/user")
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
        <label>
          Username
          <input
            className="border p-2 w-full"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            className="border p-2 w-full"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn-neutral mt-2">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
