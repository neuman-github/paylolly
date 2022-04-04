const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const crudController = require('./crudController')

app.use(bodyParser.json())
app.use(cors())
app.use('/', function (req, res, next) {
  req.db = con
  next()
})
app.get('/getTasks', crudController.getTasks)
app.post('/createTask', crudController.createTask)
app.delete('/deleteTask/:task_id', crudController.deleteTask)
app.put('/updateTask/:task_id', crudController.updateTask)

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'payLolly',
  multipleStatements: true
})

con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

app.listen(4000, () => console.log('listening port 4000'))

module.exports = con
