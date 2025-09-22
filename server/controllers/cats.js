const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET all cats (include images)
exports.getCats = async (req, res) => {
  try {
    const cats = await prisma.cats.findMany({
      include: { images: true }
    })
    res.json(cats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET single cat by ID
exports.getCatById = async (req, res) => {
  try {
    const cat = await prisma.cats.findUnique({
      where: { cat_id: Number(req.params.id) },
      include: { images: true }
    })
    if (!cat) return res.status(404).json({ error: "Cat not found" })
    res.json(cat)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// CREATE new cat (admin only)
exports.createCat = async (req, res) => {
  try {
    const { name, age, gender, status, description } = req.body
    const cat = await prisma.cats.create({
      data: { name, age, gender, status, description }
    })
    res.status(201).json(cat)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// UPDATE cat info
exports.updateCat = async (req, res) => {
  try {
    const { id } = req.params
    const { name, age, gender, status, description } = req.body

    const cat = await prisma.cats.update({
      where: { cat_id: Number(id) },
      data: { name, age, gender, status, description }
    })
    res.json(cat)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// DELETE cat
exports.deleteCat = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.cats.delete({
      where: { cat_id: Number(id) }
    })
    res.json({ message: "Cat deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
