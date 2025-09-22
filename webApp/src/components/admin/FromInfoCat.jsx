import React, { useState, useEffect } from 'react'
import useWebStore from '../../store/web-store'
import { createCat, deleteCat, updateCat } from '../../api/cats'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'

const FromInfoCat = () => {
  // const initialState = {
  //   images: []
  // }

  const token = useWebStore((state) => state.token)
  const fetchCats = useWebStore((state) => state.getCats)
  const cats = useWebStore((state) => state.fetchCats)
  const [cat_id, setCat_Id] = useState(null) // ใช้ null เวลาไม่ update
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [description, setDescription] = useState('')

  // const [form, setForm] = useState(initialState)


  useEffect(() => {
    fetchCats()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !age || !gender || !description) {
      return toast.warning('Please fill all fields')
    }

    const form = { name, age: Number(age), gender, description }

    try {
      if (cat_id) {
        // ถ้ามี cat_id → update
        await updateCat(token, cat_id, form)
        toast.success('Cat updated successfully!')
      } else {
        // ถ้าไม่มี cat_id → create
        await createCat(token, form)
        toast.success('Cat created successfully!')
      }
      // รีเซ็ต form
      setCat_Id(null)
      setName('')
      setAge('')
      setGender('')
      setDescription('')
      fetchCats() // refresh list
    } catch (error) {
      console.log(error)
      toast.error('Operation failed')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCat(token, id)
      toast.success('Cat deleted!')
      fetchCats()
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete cat')
    }
  }

  const handleEdit = (cat) => {
    setCat_Id(cat.cat_id)
    setName(cat.name)
    setAge(cat.age)
    setGender(cat.gender)
    setDescription(cat.description)
  }

  return (
    <div className='container mt-auto p-4 bg-white rounded shadow'>
      <h1>Infomation Cats</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          className='border m-1 p-1'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='border m-1 p-1'
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          className='border m-1 p-1'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          className='border m-1 p-1'
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-primary mx-1'>
          {cat_id ? 'Update' : 'Submit'}
        </button>
      </form>
      {/* <Uploadfile form={form} setForm={setForm} /> */}
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th>Cat ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((item) => (
            <tr key={item.cat_id}>
              <td>{item.cat_id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.status}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="btn btn-warning mr-2 bg-yellow-400"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2 bg-red-500"
                  onClick={() => handleDelete(item.cat_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default FromInfoCat
