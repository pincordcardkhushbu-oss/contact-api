const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dns = require('dns');
require('dotenv').config();

const userRoute = require('./api/routes/user')
const contactRoute = require('./api/routes/contact')

dns.setServers(['8.8.8.8', '8.8.4.4']);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("connected to database"))
.catch(err=> console.log(err))

app.use(bodyParser.json())

app.use('/user', userRoute)
app.use('/contact', contactRoute)

app.use('*',(req,res)=>{
    res.status(404).json({ msg:'bad request' })
})

module.exports = app;
