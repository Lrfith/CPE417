import React, { useState, useEffect } from 'react'
import useWebStore from '../../store/web-store'
import { createCat, deleteCat, updateCat } from '../../api/cats'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'

const FromInfoCat = () => {
  const initialState = {
    images: []
  }

  const token = useWebStore((state) => state.token)
  const cats = useWebStore((state) => state.fetchCats)   // ✅ array เก็บแมว
  const fetchCats = useWebStore((state) => state.getCats) // ✅ function ดึงแมว


  const [cat_id, setCat_Id] = useState(null)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [description, setDescription] = useState('')

  const [form, setForm] = useState(initialState)

  useEffect(() => {
    fetchCats()
  }, [fetchCats])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !age || !gender || !description) {
      return toast.warning('Please fill all fields')
    }

    // const payload = {
    //   name,
    //   age: Number(age),
    //   gender,
    //   description,
    //   images: form.images // ✅ แนบ images เข้า payload ด้วย
    // }
  const payload = {
    name,
    age: Number(age),
    gender,
    status: "Available", // default
    description,
    images: form.images   // ✅ ตอนนี้มี { asset_id, public_id, url }
  }
    try {
      if (cat_id) {
        await updateCat(token, cat_id, payload)
        toast.success('Cat updated successfully!')
      } else {
        await createCat(token, payload)
        toast.success('Cat created successfully!')
      }

      // reset form
      setCat_Id(null)
      setName('')
      setAge('')
      setGender('')
      setDescription('')
      setForm(initialState)

      fetchCats()
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
    setForm({ images: cat.images || [] }) // ✅ โหลด images ตอน edit
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

      {/* Upload images */}
      <Uploadfile form={form} setForm={setForm} />

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
            <th>Image</th>
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
                {Array.isArray(item.images) && item.images.length > 0
                  ? item.images.map((img) => (
                    <img
                      key={img.id || img.asset_id}
                      src={img.url || img.secure_url}
                      alt={item.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "5px",
                      }}
                    />
                  ))
                  : <span>No Image</span>
                }
              </td>



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
