const express = require('express')
const cors = require('cors')
const fs = require('fs')
const usersRouter = require('./routes/users')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
});

module.exports = app;
