const conexao = require('../config/conexao')
const { validationResult } = require('express-validator');

exports.listar = (req, res) => {
 
  let descricao = req.query.f || ""
  descricao = "%" + descricao + "%"

  const query = 'select t.id, t.descricao, t.data, t.realizado, c.descricao as categoria, c.cor, t.categoria_id from tarefas t, categorias c where t.categoria_id = c.id order by t.realizado'

  conexao.query(query, [descricao], (err, rows) => {
    if (err){
      console.log(err)
      res.status(500)
      res.json({"message": "Internal Server Error"})
    } else if (rows.length > 0){
      res.status(200)
      res.json(rows)
    } else {
      res.status(404)
      res.json({"message": "Nenhuma tarefa cadastrada para esta busca"})
    }
  })
}

exports.listarPorId = (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      
      const id = req.params.id
  
      const query = 'select * from tarefas where id = ?'
  
      conexao.query(query, [id], (err, rows) => {
        if (err){
          console.log(err)
          res.status(500)
          res.json({"message": "Internal Server Error"})
        } else if (rows.length > 0){
          res.status(200)
          res.json(rows[0])
        } else {
          res.status(404)
          res.json({"message": "Nenhuma tarefa cadastrada com esse id"})
        }
      })
    }
  }

  exports.inserir = (req, res) => {
 
    const tarefa = {}
    tarefa.descricao = req.body.descricao
    tarefa.data = req.body.data
    tarefa.realizado = req.body.realizado
    tarefa.categoria_id = req.body.categoria_id
   
    const query = 'insert into tarefas (descricao, data, realizado, categoria_id) values (?, ?, ?, ?)'
   
    conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.categoria_id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else {
        res.status(201)
        res.json({"message": result.insertId})
      }
    })
  }

  exports.alterar = (req, res) => {
 
    const tarefa = {}
    tarefa.id = req.params.id
    tarefa.descricao = req.body.descricao
    tarefa.data = req.body.data
    tarefa.realizado = req.body.realizado
    tarefa.categoria_id = req.body.categoria_id

    const query = 'update tarefas set descricao = ?,  data = ?, realizado = ?, categoria_id = ? where id = ?'

    conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.categoria_id, tarefa.id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (result.affectedRows > 0){
        res.status(202)
        res.json({"message": "Tarefa alterada"})
      } else {
        res.status(404)
        res.json({"message": "Tarefa não encontrada"})
      }
    })
}
exports.selecionar = (req, res) => {
 
    const tarefa = {}
    tarefa.id = req.params.id
    tarefa.realizado = req.body.realizado

    const query = 'update tarefas set realizado = ? where id = ?'

    conexao.query(query, [tarefa.realizado, tarefa.id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (result.affectedRows > 0){
        res.status(202)
        res.json({"message": "Tarefa alterada"})
      } else {
        res.status(404)
        res.json({"message": "Tarefa não encontrada"})
      }
    })
}

exports.deletar = (req, res) => {
 
    const id = req.params.id
  
    const query = 'delete from tarefas where id = ?'
  
    conexao.query(query, [id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (result.affectedRows > 0){
        res.status(200)
        res.json({"message": "Tarefa deleta"})
      } else {
        res.status(404)
        res.json({"message": "Tarefa não encontrada"})
      }
    })
  }

  