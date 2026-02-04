const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

app.use('/user', userRoutes)

module.exports = app
