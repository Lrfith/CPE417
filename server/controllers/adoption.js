const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Request adoption (user)
exports.requestAdoption = async (req, res) => {
  try {
    const { cat_id } = req.body
    const user_id = req.user.id  // มาจาก token (authCheck middleware)

    // ตรวจว่าแมวมีอยู่ไหม
    const cat = await prisma.cats.findUnique({
      where: { cat_id: Number(cat_id) }
    })
    if (!cat) return res.status(404).json({ error: "Cat not found" })

    // สร้าง adoption request
    const adoption = await prisma.adoptions.create({
      data: {
        user_id,
        cat_id: Number(cat_id),
        adoption_date: new Date(),
        status: "Pending"
      }
    })
    res.status(201).json(adoption)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET /api/adoptions
exports.getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await prisma.adoptions.findMany({
      include: {
        cat: true,    // ดึงข้อมูลแมว
        user: {       // ดึง username ของ user
          select: {
            username: true
          }
        }
      }
    })
    res.json(adoptions)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// Get user’s own adoptions
exports.getUserAdoptions = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const adoptions = await prisma.adoptions.findMany({
      where: { user_id },
      include: { cat: true }
    })
    res.json(adoptions)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get adoption by ID
exports.getAdoptionById = async (req, res) => {
  try {
    const { id } = req.params
    const adoption = await prisma.adoptions.findUnique({
      where: { adoption_id: Number(id) },
      include: { user: true, cat: true }
    })
    if (!adoption) return res.status(404).json({ error: "Adoption not found" })
    res.json(adoption)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update adoption status (admin)
exports.updateAdoptionStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body // "Pending" หรือ "Approved"

    // ดึง adoption พร้อม cat
    const adoption = await prisma.adoptions.findUnique({
      where: { adoption_id: Number(id) },
      include: { cat: true }
    })
    if (!adoption) return res.status(404).json({ error: "Adoption not found" })

    // ถ้า approved → update both adoption + cat
    if (status === "Approved") {
      await prisma.$transaction([
        prisma.adoptions.update({ where: { adoption_id: Number(id) }, data: { status: "Approved" } }),
        prisma.cats.update({ where: { cat_id: adoption.cat_id }, data: { status: "Adopted" } })
      ])
    }
    else {
      // อัปเดตเฉพาะ adoption ถ้าไม่ approved
      await prisma.adoptions.update({
        where: { adoption_id: Number(id) },
        data: { status }
      })
    }

    res.json({ message: "Adoption updated successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteAdoption = async (req, res) => {
  try {
    const { id } = req.params

    const adoption = await prisma.adoptions.findUnique({
      where: { adoption_id: Number(id) },
      include: { cat: true }
    })
    if (!adoption) return res.status(404).json({ error: "Adoption not found" })

    if (adoption.status === "Approved") {
      await prisma.$transaction([
        prisma.adoptions.delete({ where: { adoption_id: Number(id) } }),
        prisma.cats.update({
          where: { cat_id: adoption.cat_id },
          data: { status: "Available" }
        })
      ])
    } else {
      await prisma.adoptions.delete({ where: { adoption_id: Number(id) } })
    }

    res.json({ message: "Adoption deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


