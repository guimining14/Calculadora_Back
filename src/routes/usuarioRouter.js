const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')


// Lista de rotas
router.get('/', usuarioController.listar)
router.post('/', usuarioController.inserir)

module.exports = router
