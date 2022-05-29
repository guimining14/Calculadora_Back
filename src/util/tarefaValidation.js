const { check } = require('express-validator')

exports.listarPorId = [
  check('id')
    .exists().withMessage('O id não pode estar em branco')
    .isInt().withMessage('O id deve ser numérico')
]

exports.inserir = [
  check('descricao').exists().trim().withMessage('A descrição da tarefa não pode estar em branco'),
  check('data').exists().trim().withMessage('O horário e data da tarefa não pode estar em branco'),
  check('categoria_id').exists().trim().withMessage('A categoria da tarefa deve ser definida')
]

exports.alterar = [
  check('id')
    .exists().withMessage('O id não pode estar em branco')
    .isInt().withMessage('O id deve ser numérico'),
  check('descricao').exists().trim().withMessage('A descrição da tarefa não pode estar em branco'),
  check('data').exists().trim().withMessage('O horário e data da tarefa não pode estar em branco'),
  check('categoria_id').exists().trim().withMessage('A categoria da tarefa deve ser definida')
]

exports.deletar = [
  check('id')
    .exists().withMessage('O id não pode estar em branco')
    .isInt().withMessage('O id deve ser numérico')
]