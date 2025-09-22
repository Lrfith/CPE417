import { create } from "zustand"
import axios from 'axios'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getCats } from "../api/cats"

const webStore = (set) => ({
  username: null,
  token: null,
  fetchCats: [],
  
  actionLogin: async (form) => {

    const res = await axios.post("http://localhost:5000/api/login", form)
    set({
      username: res.data.payload,
      token: res.data.token
    })
    return res

  },
  // Register function
  actionRegister: async (form) => {
    const res = await axios.post("http://localhost:5000/api/register", form)
    return res
  },
  getCats: async() => {
    try {
      const res = await getCats()
      set({fetchCats: res.data})
    } catch (error) {
      console.log(error)
    }
  }
})

const usePersist = {
  name: "web-storage",
  storage: createJSONStorage(() => localStorage)
}
const useWebStore = create(persist(webStore, usePersist))

export default useWebStore