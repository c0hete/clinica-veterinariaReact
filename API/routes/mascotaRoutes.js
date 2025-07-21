const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')

router.get('/', mascotaController.getAll)
router.get('/:id', mascotaController.getById)
router.post('/', mascotaController.create)
router.put('/:id', mascotaController.update)
router.delete('/:id', mascotaController.remove)

module.exports = router
