const prisma = require("../config/prisma")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and Password is required" })
    }

    const userExists = await prisma.users.findFirst({ where: { username } })
    if (userExists) return res.status(400).json({ msg: "Username already exists" })

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.users.create({
      data: { username, password_hash: hashPassword }
    })

    // ส่ง token พร้อม user_id
    const payload = {
      user_id: newUser.user_id,
      username: newUser.username,
      role: newUser.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(201).json({ user: payload, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Server Error" })
  }
}

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and Password is required" })
    }

    const user = await prisma.users.findFirst({ where: { username } })
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" })

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

    const payload = {
      user_id: user.user_id,   // ใช้ user_id แทน id
      username: user.username,
      role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ payload: payload, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Server Error" })
  }
}

// CURRENT USER
exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: { user_id: req.user.user_id },  // ใช้ user_id จาก token
      select: {
        user_id: true,
        username: true,
        role: true
      }
    })

    if (!user) return res.status(404).json({ msg: "User not found" })

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Server Error" })
  }
}
