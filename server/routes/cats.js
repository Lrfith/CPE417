const express = require('express');
const { getCats, getCatById, createCat, updateCat, deleteCat } = require('../controllers/cats');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/authCheck')

router.get('/cats', getCats)
router.get('/cats/:id', getCatById)
router.post('/cats', authCheck, adminCheck, createCat)
router.put('/cats/:id', authCheck, adminCheck, updateCat)
router.delete('/cats/:id', authCheck, adminCheck, deleteCat)


module.exports = router