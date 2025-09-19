const experss = require('express')
const router = experss.Router()

const { register, login, currentUser } = require('../controllers/auth')

router.post('/register', register)
router.get('/login', login)
router.get('/current-user', currentUser)
// router.get('/current-admin', currentAdmin)

module.exports = router