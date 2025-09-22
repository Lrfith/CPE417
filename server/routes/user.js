const express = require('express')
const { changeRole, getUsers, addAddress, getAddresses, getUserAdoptionsHistory } = require('../controllers/user')
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const router = express.Router()

router.get('/users', authCheck, adminCheck, getUsers)
router.post('/change-role', authCheck, adminCheck, changeRole)

router.post('/users/addresses', authCheck, addAddress)
router.get('/users/addresses', authCheck, getAddresses)

router.get('/user/adoptions', authCheck, getUserAdoptionsHistory)

module.exports = router
