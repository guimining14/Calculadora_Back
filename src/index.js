const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
const cors = require('cors')

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

const tarefaRouter = require('./routes/tarefaRouter')
app.use('/api/v1/tarefas', tarefaRouter)

const categoriaRouter = require('./routes/categoriaRouter')
app.use('/api/v1/categorias', categoriaRouter)

const usuarioRouter = require('./routes/usuarioRouter')
app.use('/api/v1/usuarios', usuarioRouter)

const calculoRouter = require('./routes/calculoRouter')
app.use('/api/v1/calculo', calculoRouter)

const apiRouter = require('./routes/apiRouter')
app.use('/api/v1/api',apiRouter)

const port = process.env.PORT
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })