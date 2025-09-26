const express = require('express')
const router = express.Router()
const { addImage, getImagesByCat, deleteImage, createImages, removeImages, getImages } = require('../controllers/images')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

// Add image (admin only)
router.post('/cats/:catId/images', authCheck, adminCheck, addImage)

// Get images for a cat
router.get('/cats/:catId/images', getImagesByCat)

// Delete image (admin only)
router.delete('/images/:imageId', authCheck, adminCheck, deleteImage)

router.post('/images', authCheck, adminCheck, createImages)
router.post('/removeimages', authCheck, adminCheck, removeImages)
router.get('/images', getImages)

module.exports = router
