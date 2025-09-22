const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// GET /api/users (admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        user_id: true,
        username: true,
        phone: true,
        role: true,
        created_at: true,
        updated_at: true,
        addresses: true,   // ดึง address ด้วย
        adoptions: true    // ดึง adoption ด้วย
      }
    })
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}


exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;

    const user = await prisma.users.update({
      where: { user_id: Number(id) },
      data: { role },
    });

    res.json({ message: "Update Role Success", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// POST /api/user/addresses
exports.addAddress = async (req, res) => {
  try {
    console.log("req.user:", req.user)   // ดูว่ามี user_id จริงมั้ย
    console.log("body:", req.body)       // ดูว่ารับ body มาถูกต้องมั้ย

    const { street, city, state, postal_code, country } = req.body

    const address = await prisma.addresses.create({
      data: {
        user_id: req.user.user_id,
        street,
        city,
        state,
        postal_code,
        country
      }
    })

    res.status(201).json(address)
  } catch (err) {
    console.error(err) // log error
    res.status(500).json({ message: "Server Error", error: err.message })
  }
}


// GET /api/user/addresses
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await prisma.addresses.findMany({
      where: { user_id: req.user.user_id }
    })
    res.json(addresses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}

// GET /api/user/adoptions
exports.getUserAdoptionsHistory = async (req, res) => {
  try {
    const user_id = req.user.user_id // ดึงจาก token

    const adoptions = await prisma.adoptions.findMany({
      where: { user_id },
      include: {
        cat: {
          select: {
            cat_id: true,
            name: true,
            gender: true,
            status: true
          }
        }
      },
      orderBy: { adoption_date: 'desc' } // ล่าสุดก่อน
    })

    res.json(adoptions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server Error" })
  }
}
