const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');

require('dotenv').config();

const userRoute = require('./routes/user');
const contactRoute = require('./routes/contact');

const app = express();

// DNS fix for MongoDB SRV
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ✅ built-in json parser (body-parser ki zarurat nahi)
app.use(express.json());

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ connected to database"))
  .catch(err => console.log(err));

// routes
app.use('/user', userRoute);
app.use('/contact', contactRoute);

// 404
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'bad request' });
});

// ⭐ VERY IMPORTANT
module.exports = app;
