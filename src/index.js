const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
const cors = require('cors')

app.use(cors());

const usuarioRouter = require('./routes/usuarioRouter')
app.use('/api/v1/usuarios', usuarioRouter)

const calculoRouter = require('./routes/calculoRouter')
app.use('/api/v1/calculo', calculoRouter)

const port = process.env.PORT
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })