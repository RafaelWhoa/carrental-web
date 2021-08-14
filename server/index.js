const express = require('express');
const app = express();
const admin = require('./routes/admin');

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Routes
app.use('/admin', admin)

//Server config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log('listening on port ' + PORT)})