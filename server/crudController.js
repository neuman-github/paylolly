const getTasks = (req, res) => {
  const sql = `SELECT * FROM task`
  const DB = req.db
  DB.query(sql, function (err, result) {
    if (err) return res.status(400).send(err)
    return res.status(200).send(result)
  })
}
const createTask = (req, res) => {
  console.log(req.body);
  const sql = `INSERT INTO task (name, endDate,status) VALUES ("${req.body.name}","${req.body.endDate}",1 )`
  const DB = req.db
  DB.query(sql, function (err, result) {
    if (err) return res.status(400).send(err)
    return res.status(200).send(req.body)
  })
}
const updateTask = (req, res) => {
  const date = req.body.endDate.split('T')[0]
  const sql = `UPDATE task SET name = '${req.body.name}',endDate='${date}',status='${req.body.status}' WHERE _id = '${req.params.task_id}';`
  const DB = req.db
  DB.query(sql, function (err, result) {
    if (err) return res.status(400).send(err)
    return res.status(200).send(req.body)
  })
}
const deleteTask = (req, res) => {
  const sql = `DELETE FROM task WHERE _id = '${req.params.task_id}';`
  const DB = req.db
  DB.query(sql, function (err, result) {
    if (err) return res.status(400).send(err)
    return res.status(200).send(result)
  })
}

module.exports = { getTasks, createTask, updateTask, deleteTask }
