const client=require('./connection.js');
const express=require('express');
const app=express();
const cors = require('cors');
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())


app.listen(process.env.PORT||3000,()=>{
 console.log('Server is now listening at port 3000')
})


client.connect();


app.get('/logs',(req,res)=>{
    client.query(`SELECT * FROM logs`)
        .then(result => res.send(result.rows))
        .catch(e => {
            console.error(e.stack);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => client.end());
})


app.get('/logs/:id',(req,res)=>{
    client.query(`SELECT * FROM logs where id=${req.params.id}`)
        .then(result => res.send(result.rows))
        .catch(e => {
            console.error(e.stack);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => client.end());
})

app.post('/logs',(req,res)=>{

    const log=req.body;

    let insertQuery=`INSERT INTO public.logs(logname)
        VALUES ('${log.logname}');`

    client.query(insertQuery)
    .then(result => res.send('Insertion was successfull!'))
    .catch(e => {
        console.error(e.stack);
        res.status(500).send('Internal Server Error');
    })
    .finally(() => client.end());

})


app.put('/logs/:id', (req, res)=> {
    let log = req.body;
    let updateQuery = `update public.logs
                       set logname = '${log.logname}'
                       where id = ${log.id}`

    client.query(updateQuery)
    .then(result => res.send('Update was successfull!'))
    .catch(e => {
        console.error(e.stack);
        res.status(500).send('Internal Server Error');
    })
    .finally(() => client.end());
})


app.delete('/logs/:id', (req, res)=> {
    let deleteQuery = `delete from public.logs where id=${req.params.id}`
    
    client.query(deleteQuery)
    .then(result => res.send('Deleted!!'))
    .catch(e => {
        console.error(e.stack);
        res.status(500).send('Internal Server Error');
    })
    .finally(() => client.end());
})


app.get('/a/:a/b/:b',(req,res)=>{
    res.json('about'+req.params)
})