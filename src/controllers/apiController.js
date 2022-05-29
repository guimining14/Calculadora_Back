const conexao = require('../config/conexao')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

exports.login = (req, res) => {

    const email = req.body.email
    const senha = req.body.senha
  
    const query = 'select * from usuarios where email = ?'
  
    conexao.query(query, [email], (err, rows) => {
  
      if (err){        
        console.log(err)
        res.status(500)
        res.json({
          auth: false,
          "message": "Internal Server Error"
        })
     
      } else if (rows.length > 0){
        //bcrypt.compare(senha, rows[0].senha, (err, resp) => {
          if (true){
            const usuario = rows[0].id
            jwt.sign({usuario}, process.env.SECRET, {expiresIn: 300}, (err, token) => {
              res.status(200)
              res.json({
                auth: true,
                token: token
              })
            })
          } else {
  
            res.status(403)
            res.json({
              auth: false,
              message: "E-mail e/ou senhas incorreto(s)"
            })
          }
        //})
      } else {
        res.status(403)
        res.json({
          auth: false,
          message: "E-mail e/ou senhas incorreto(s)"
        })
      }
    })
  }

  exports.verificar = (req, res, next) => {

    const token = req.headers['access-token']
   
    if (!token){
      res.status(401)
      res.send({
        auth: false,
        message: 'O token está em branco'
      })
    }
   
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
     
      if (err){
        res.status(500)
        res.send({
          auth: false,
          message: 'Falha de autenticação'
        })
      } else {
        next()
      }
    })
  }

  exports.logoff = (req, res) => {
    res.status(200)
    res.send({
      auth: false,
      token: null
    })
  }

