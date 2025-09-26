import axios from 'axios'

const API_URL = 'http://localhost:5000/api/cats'

// GET all cats
export const getCats = async () => {
  return axios.get(API_URL)
}

// GET single cat by ID
export const getCatById = async (id) => {
  return axios.get(`${API_URL}/${id}`)
}

// POST create new cat (admin only)
export const createCat = async (token, form) => {
  return axios.post(API_URL, form, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

// PUT update cat info (admin only)
export const updateCat = async (token, id, form) => {
  return axios.put(`${API_URL}/${id}`, form, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

// DELETE remove cat (admin only)
export const deleteCat = async (token, id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}


export const uploadFile = async (token, form) => {
  return axios.post('http://localhost:5000/api/images',{
    images: form
  }, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
