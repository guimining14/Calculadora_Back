const conexao = require('../config/conexao')

exports.listar = (req, res) => {
 
    let descricao = req.query.f || ""
    descricao = "%" + descricao + "%"
  
    const query = 'select * from categorias '
  
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