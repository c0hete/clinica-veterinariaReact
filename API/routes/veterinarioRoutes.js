const express = require('express')
const router = express.Router()
const veterinarioController = require('../controllers/veterinarioController')

router.get('/', veterinarioController.getAll)
router.get('/:id', veterinarioController.getById)
router.post('/', veterinarioController.create)
router.put('/:id', veterinarioController.update)
router.delete('/:id', veterinarioController.remove)

module.exports = router
