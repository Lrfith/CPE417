import React, { useEffect, useState } from 'react'
import useWebStore from '../../store/web-store'
import axios from 'axios'

const Dashboard = () => {
  const token = useWebStore((state) => state.token)
  const [adoptions, setAdoptions] = useState([])
  const [stats, setStats] = useState({ totalCats: 0, totalUsers: 0, totalAdoptions: 0 })

  // ดึงข้อมูลทั้งหมดของ adoption
  const fetchAdoptions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/adoptions', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAdoptions(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // ดึงสถิติพื้นฐาน
  const fetchStats = async () => {
    try {
      const catsRes = await axios.get('http://localhost:5000/api/cats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const usersRes = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const adoptionsRes = await axios.get('http://localhost:5000/api/adoptions', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats({
        totalCats: catsRes.data.length,
        totalUsers: usersRes.data.length,
        totalAdoptions: adoptionsRes.data.length
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchAdoptions()
    fetchStats()
  }, [])

  return (
    <div className='container mt-auto p-4 bg-white rounded shadow'>
      <h1 className='text-xl font-bold mb-4'>Admin Dashboard</h1>

      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='p-4 bg-blue-100 rounded shadow'>
          <h2 className='font-bold'>Total Cats</h2>
          <p>{stats.totalCats}</p>
        </div>
        <div className='p-4 bg-green-100 rounded shadow'>
          <h2 className='font-bold'>Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div className='p-4 bg-yellow-100 rounded shadow'>
          <h2 className='font-bold'>Total Adoptions</h2>
          <p>{stats.totalAdoptions}</p>
        </div>
      </div>

      <h2 className='text-lg font-bold mb-2'>Recent Adoption Requests</h2>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Cat Name</th>
            <th>User</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {adoptions.map((a) => (
            <tr key={a.adoption_id}>
              <td>{a.cat.name}</td>
              <td>{a.user.username}</td>
              <td>{a.status}</td>
              <td>{new Date(a.adoption_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
