const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('../models/User')
const User = mongoose.model('user')


module.exports = function(passport){
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        User.findOne({email: email}).lean().then((user) => {
            if(!user){
                return done(null, false, {message: 'Esta conta não existe'})
            }

            bcrypt.compare(password, user.password, (error, sameHash) => {
                if(sameHash){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        }).lean()
    })
}