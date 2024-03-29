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
    client.query(`SELECT * FROM logs`,(err,result)=>{
        if(!err){
            res.send(result.rows);
        }
    })
    client.end;
})


app.get('/logs/:id',(req,res)=>{
    client.query(`SELECT * FROM logs where id=${req.params.id}`,(err,result)=>{
        if(!err){
            res.send(result.rows);
        }
    })
    client.end;
})


app.post('/logs',(req,res)=>{
    console.log(':::: '+req.body)
    const log=req.body;
    let insertQuery=`INSERT INTO public.logs(logname)
        VALUES ('${log.logname}');`

     client.query(insertQuery,(err,result)=>{
        if(!err){
            res.send('Insertion was successfull!')
        }else{
            console.log(err.message)
        }
     })
    client.end;
})


app.put('/logs/:id', (req, res)=> {
    let log = req.body;
    let updateQuery = `update public.logs
                       set logname = '${log.logname}'
                       where id = ${log.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.delete('/logs/:id', (req, res)=> {
    let insertQuery = `delete from public.logs where id=${req.params.id}`
    
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.get('/a/:a/b/:b',(req,res)=>{
    res.json('about'+req.params)
})