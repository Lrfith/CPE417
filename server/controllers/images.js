const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ✅ Add image to a cat
exports.addImage = async (req, res) => {
  try {
    const { asset_id, public_id, url } = req.body
    const { catId } = req.params

    // ตรวจว่าแมวมีอยู่ไหม
    const cat = await prisma.cats.findUnique({
      where: { cat_id: Number(catId) }
    })
    if (!cat) return res.status(404).json({ error: "Cat not found" })

    const image = await prisma.image.create({
      data: {
        cat_id: Number(catId),
        asset_id,
        public_id,
        url
      }
    })
    res.status(201).json(image)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Get images for a cat
exports.getImagesByCat = async (req, res) => {
  try {
    const { catId } = req.params
    const images = await prisma.image.findMany({
      where: { cat_id: Number(catId) }
    })
    res.json(images)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ✅ Delete an image
exports.deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params
    await prisma.image.delete({
      where: { image_id: Number(imageId) }
    })
    res.json({ message: "Image deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
