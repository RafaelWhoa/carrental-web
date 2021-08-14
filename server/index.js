const express = require('express');
const app = express();
const admin = require('./routes/admin');
const mongoose = require('mongoose')
const Mongoose = require('./config/db')

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Routes
app.use('/admin', admin)
app.get('/', (req, res) => {
    res.send('salve')
})

//Server config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log('listening on port ' + PORT)})