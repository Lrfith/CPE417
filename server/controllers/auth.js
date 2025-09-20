const prisma = require("../config/prisma")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and Password is required" })
    }

    const user = await prisma.users.findFirst({
      where: { username }
    })

    if (user) return res.status(400).json({ msg: "Username already exists" })

    const hashPassword = await bcrypt.hash(password, 10)

    await prisma.users.create({
      data: {
        username,
        password_hash: hashPassword,
      }
    })

    res.json({ msg: "Register success" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Server Error" })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and Password is required" })
    }

    const user = await prisma.users.findFirst({
      where: { username }
    })

    if (!user) return res.status(400).json({ msg: "Invalid Credentials" })

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

    const payload = {
      id: user.user_id,
      username: user.username,
      role: user.role
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err
      res.json({ payload, token })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Server Error" })
  }
}

exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: { username: req.user.username },
      select: {
        user_id: true,
        username: true,
        role: true
      }
    })

    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Server Error" })
  }
}
