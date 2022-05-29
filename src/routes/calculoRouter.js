const express = require('express')
const router = express.Router()
const calculoController = require('../controllers/calculoController')


// Lista de rotas
router.post('/', calculoController.calcular)

module.exports = router
