const express = require('express')
const router = express.Router()

const { authCheck, adminCheck } = require('../middlewares/authCheck')

const {
  requestAdoption,
  getAllAdoptions,
  getUserAdoptions,
  getAdoptionById,
  updateAdoptionStatus,
  deleteAdoption
} = require('../controllers/adoption')


// User routes
// User routes
router.post('/adoptions', authCheck, requestAdoption)    // user: ขอรับเลี้ยง
router.get('/adoptions/user', authCheck, getUserAdoptions) // user: ดู adoption ของตัวเอง
router.get('/adoptions/:id', authCheck, getAdoptionById)   // user/admin: ดู adoption รายตัว


// Admin routes
router.get('/adoptions', getAllAdoptions)  // admin: ดูทั้งหมด
router.put('/adoptions/:id',updateAdoptionStatus) // admin: อัปเดตสถานะ

router.delete('/adoptions/:id', authCheck, adminCheck, deleteAdoption) // admin: ลบ adoption


module.exports = router
