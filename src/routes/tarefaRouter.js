const express = require('express')
const router = express.Router()
const tarefaController = require('../controllers/tarefaController')
//const apiController = require('../controllers/apiController')
const tarefaValidation = require('../util/tarefaValidation')

// Lista de rotas
router.get('/', /*apiController.verificar,*/ tarefaController.listar)
router.get('/:id', tarefaValidation.listarPorId, /*apiController.verificar,*/ tarefaController.listarPorId)
router.post('/',tarefaValidation.inserir, /*apiController.verificar, */tarefaController.inserir)
router.put('/:id',tarefaValidation.alterar, /*apiController.verificar,*/ tarefaController.alterar)
router.delete('/:id',tarefaValidation.deletar, /*apiController.verificar,*/ tarefaController.deletar)
router.put('/checked/:id',tarefaController.selecionar)

module.exports = router
const app = express()

app.get('/api/v1', (req, res) => {
  res.json({
    message: "API Tarefas v1.0"
  })
})

// Rotas

