const express = require('express');
const app = express();
const admin = require('./routes/admin');
const mongoose = require('mongoose');
const Mongoose = require('./config/db');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
require('../server/models/Agency')
const Agency = mongoose.model('agency')
const user = require('./routes/user')
const passport = require('passport')
require('./config/auth')(passport)


//Session
app.use(session({
    secret: "sim",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash('error')
    next()
})

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
app.use('/user', user)
app.get('/', (req, res) => {
    Agency.find().lean().then((agency) => {
        res.render('index', {agency:agency})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno')
        res.redirect('/')
    })
})

app.get('/500', (req, res) => {
    res.sendStatus(500)
})

//Server config
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log('listening on port ' + PORT)})