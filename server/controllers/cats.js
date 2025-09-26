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
    const { name, age, gender, status, description, images } = req.body
    const cat = await prisma.cats.create({
      data: {
        name,
        age,
        gender,
        status,
        description,
        images: images && images.length > 0 ? {
          create: images.map(img => ({
            asset_id: img.asset_id,
            public_id: img.public_id,
            url: img.url
          }))
        } : undefined
      }
    })

    res.status(201).json(cat)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// // UPDATE cat info
// exports.updateCat = async (req, res) => {
//   try {
//     const { id } = req.params
//     // const { name, age, gender, status, description } = req.body

//     // const cat = await prisma.cats.update({
//     //   where: { cat_id: Number(id) },
//     //   data: { name, age, gender, status, description }
//     // })
//     const { name, age, gender, status, description, images } = req.body
//     const cat = await prisma.cats.update({
//       where: { cat_id: Number(id) },
//       data: {
//         name, age, gender, status, description,
//         images: images && images.length > 0 ? {
//           deleteMany: {}, // ลบรูปเก่า
//           create: images.map(img => ({
//             asset_id: img.asset_id,
//             public_id: img.public_id,
//             url: img.url
//           }))
//         } : undefined
//       }
//     })

//     res.json(cat)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// // DELETE cat
// exports.deleteCat = async (req, res) => {
//   try {
//     const { id } = req.params
//     await prisma.cats.delete({
//       where: { cat_id: Number(id) }
//     })
//     res.json({ message: "Cat deleted successfully" })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }


exports.createCat = async (req, res) => {
  try {
    const { name, age, gender, status, description, images } = req.body
    const cat = await prisma.cats.create({
      data: {
        name,
        age,
        gender,
        status,
        description,
        images: images && images.length > 0 ? {
          create: images.map(img => ({
            asset_id: img.asset_id,
            public_id: img.public_id,
            url: img.url,
          }))
        } : undefined
      },
      include: { images: true }
    })
    res.status(201).json(cat)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

// Update cat + replace images
exports.updateCat = async (req, res) => {
  try {
    const { id } = req.params
    const { name, age, gender, status, description, images } = req.body

    // ลบรูปเก่า
    await prisma.image.deleteMany({ where: { cat_id: Number(id) } })

    const cat = await prisma.cats.update({
      where: { cat_id: Number(id) },
      data: {
        name,
        age,
        gender,
        status,
        description,
        images: images && images.length > 0 ? {
          create: images.map(img => ({
            asset_id: img.asset_id,
            public_id: img.public_id,
            url: img.url,
          }))
        } : undefined
      },
      include: { images: true }
    })

    res.json(cat)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}