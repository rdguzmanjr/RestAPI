
const express=require('express');
var bodyParser = require('body-parser')
const app=express();
const db = require('./queries')
const cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/logs', db.getLogs)
app.get('/logs/:id', db.getLogsById)
app.post('/logs', db.createLogs)
app.put('/logs/:id', db.updateLogs)
app.delete('/logs/:id', db.deleteLogs)

app.listen(process.env.PORT||3000,()=>{
 console.log('Server is now listening at port 3000')
})