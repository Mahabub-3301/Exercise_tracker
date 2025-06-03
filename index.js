const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = require('./app');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/',router);
const mongoose = require('mongoose');

const MONGO_URI = process.env.Mongo_URI

mongoose.connect(MONGO_URI,{
  useNewUrlParser: true, useUnifiedTopology: true
})

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
