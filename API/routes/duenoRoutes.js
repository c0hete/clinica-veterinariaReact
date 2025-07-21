const express = require('express')
const router = express.Router()
const duenoController = require('../controllers/duenoController')

router.get('/', duenoController.getAll)
router.get('/:id', duenoController.getById)
router.post('/', duenoController.create)
router.put('/:id', duenoController.update)
router.delete('/:id', duenoController.remove)

module.exports = router
