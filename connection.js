require('dotenv').config();
const {Client} = require('pg')

const client=new Client({
    host: process.env.RENDER_HOST,
    user:process.env.RENDER_USER,
    port:process.env.RENDER_PORT,
    password:process.env.RENDER_PASSWORD,
    database:process.env.RENDER_DATABASE,
   // ssl: true //only for external
})

module.exports=client