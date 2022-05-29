const conexao = require('../config/conexao')
const { validationResult } = require('express-validator');

exports.listarPorIsd = (req,res) => {
    let usuarioId = req.params.id;

    const query = 'select * from historico where usuarioId = ?';

    conexao.query(query, [usuarioId], (err, result) => {
        if (err){
          console.log(err)
          res.status(500)
          res.json({"message": "Internal Server Error"})
        } else {
          res.status(200)
          res.json(result)
  

        }
      })

}
exports.calcular = (req, res) => {
 
    let equacao = req.body.equacao
    let usuarioId = req.body.usuarioId
    let resultado = eval(equacao)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
        
    
        const historico = {}
        historico.Operacao = equacao
        historico.Resultado = resultado
        historico.UsuarioId = usuarioId
        historico.Data = today
        
        const query = 'insert into historico (Operacao, Resultado, UsuarioId, Data) values (?, ?, ?, ?)'
       
        conexao.query(query, [historico.Operacao, historico.Resultado, historico.UsuarioId, historico.Data], (err, result) => {
          if (err){
            console.log(err)
            res.status(500)
            res.json({"message": "Internal Server Error"})
          } else {
            res.status(200)
            res.json(historico)   

          }
        })
      
    


    
}
