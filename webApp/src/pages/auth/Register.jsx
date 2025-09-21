import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useWebStore from '../../store/web-store'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const actionRegister = useWebStore((state)=>state.actionRegister)

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
      const res = await actionRegister(form)
      toast.success("Register Success. Please login!")
      navigate("/login") // redirect ไปหน้า login หลัง register
    } catch (error) {
      console.log(error)
      const errMsg = error.response?.data?.msg || "Register failed"
      toast.error(errMsg)
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg w-96">
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
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
