import React, { useEffect, useState } from 'react'
import useWebStore from '../../store/web-store'
import axios from 'axios'

const AdminAdoptions = () => {
  const token = useWebStore(state => state.token)
  const [adoptions, setAdoptions] = useState([])

  const fetchAllAdoptions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/adoptions', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAdoptions(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchAllAdoptions()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/adoptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchAllAdoptions()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container mt-auto p-4 bg-white rounded shadow'>
      <h1>All Adoption Requests</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Adoption Date</th>
            <th>Cat Name</th>
            <th>Cat Gender</th>
            <th>User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adoptions.map((adopt) => (
            <tr key={adopt.adoption_id}>
              <td>{adopt.adoption_date ? new Date(adopt.adoption_date).toLocaleDateString() : '-'}</td>
              <td>{adopt.cat_id}</td>
              <td>{adopt.cat.name}</td>
              <td>{adopt.cat.gender}</td>
              <td>{adopt.user.username}</td>
              <td>{adopt.status}</td>
              <td>
                {adopt.status === 'Pending' && (
                  <button className='btn btn-success' onClick={() => handleApprove(adopt.adoption_id)}>
                    Approve
                  </button>
                )}
                <button className='btn btn-danger ml-2' onClick={() => handleDelete(adopt.adoption_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  async function handleApprove(id) {
    try {
      await axios.put(`http://localhost:5000/api/adoptions/${id}`,
        { status: 'Approved' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchAllAdoptions()
    } catch (err) {
      console.error(err)
    }
  }
}

export default AdminAdoptions
