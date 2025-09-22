const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization
    if (!headerToken) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    const token = headerToken.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // { username, role }

    // หา user จาก DB
    const user = await prisma.users.findFirst({
      where: { username: decoded.username }
    })

    if (!user) {
      return res.status(401).json({ message: "Invalid token: user not found" })
    }

    // แนบ user_id เข้า req.user ด้วย
    req.user = {
      user_id: user.user_id,
      username: user.username,
      role: user.role
    }

    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: "Token invalid or expired" })
  }
}


exports.adminCheck = async (req, res, next) => {
  try {
    const { username } = req.user
    const adminUser = await prisma.users.findFirst({
      where: { username }
    })

    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied: Admin Only' })
    }

    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error: Admin access denied' })
  }
}
