require('dotenv').config();

const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.RENDER_USER,
  host: process.env.RENDER_HOST,
  database: process.env.RENDER_DATABASE,
  password: process.env.RENDER_PASSWORD,
  port: process.env.RENDER_PORT,
  //ssl: true //only for external
})

const getLogs = (request, response) => {
    pool.query('SELECT * FROM logs ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getLogsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM logs WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createLogs = (request, response) => {
  const {logname} = request.body
  pool.query('INSERT INTO logs (logname) VALUES ($1)', [logname], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Logs added with ID: ${results.insertId}`)
  })
}

const updateLogs = (request, response) => {
  const id = parseInt(request.params.id)
  const {logname} = request.body

  pool.query(
    'UPDATE logs SET logname = $1 WHERE id = $2',
    [logname,id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteLogs = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM logs WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
module.exports = {
    getLogs,
    getLogsById,
    createLogs,
    updateLogs,
    deleteLogs,
  }