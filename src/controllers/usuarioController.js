const conexao = require('../config/conexao')
const { validationResult } = require('express-validator');

exports.listar = (req, res) => {
 
  let descricao = req.query.f || ""
  descricao = "%" + descricao + "%"

  const query = 'select * from usuario'

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
      res.json({"message": "Nenhum usuário cadastrado"})
    }
  })
}

exports.inserir = (req, res) => {
 
    const usuario = {}
    usuario.Id = req.body.Id
    usuario.Nome = req.body.Nome




    const queryFiltro = 'select * from usuario where Nome = ?'

    conexao.query(queryFiltro, [usuario.Nome], (err, rows) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (rows.length > 0){
        res.status(200)
        res.json(rows[0])
      } else {
       
        const query = 'insert into usuario (nome) values (?)'
   
        conexao.query(query, [usuario.Nome], (err, result) => {
        if (err){
            console.log(err)
            res.status(500)
            res.json({"message": "Internal Server Error"})
        } else {
            res.status(201)
            res.json({"Id": result.insertId})
        }
        })


      }
    })



    
   
    
  }
