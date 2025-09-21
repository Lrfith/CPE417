import { create } from "zustand"
import axios from 'axios'
import { persist, createJSONStorage } from 'zustand/middleware'

const webStore = (set) => ({
  username: null,
  token: null,
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
  }
})

const usePersist = {
  name: "web-storage",
  storage: createJSONStorage(() => localStorage)
}
const useWebStore = create(persist(webStore, usePersist))

export default useWebStore