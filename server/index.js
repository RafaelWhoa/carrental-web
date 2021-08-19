const express = require('express');
const app = express();
const admin = require('./routes/admin');
const mongoose = require('mongoose');
const Mongoose = require('./config/db');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');

//Session
app.use(session({
    secret: "sim",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('MMM DD YYYY')
        }
    }}))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//Public
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/admin', admin)
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/500', (req, res) => {
    res.sendStatus(500)
})

//Server config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log('listening on port ' + PORT)})