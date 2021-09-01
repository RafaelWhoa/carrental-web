const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('user');
const bcrypt = require('bcryptjs');

router.get('/register', (req, res) => {
    res.render('user/register')
})

router.post('/api/register', (req, res) => {
    
    var errors = []

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {

        errors.push({text: "Nome inválido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {

        errors.push({text: "Email inválido"})
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null) {

        errors.push({text: "Senha inválida"})
    }

    if(req.body.password != req.body.password2){

        errors.push({text: "Senhas diferentes"})
    }

    if(errors.length > 0){
        res.render('user/register', {errors: errors})
    }else{
        User.findOne({email: req.body.email}).then((user) => {
            if(user){
                req.flash('error_msg', 'Já existe uma conta com este email')
                res.redirect('/user/register')
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){
                            req.flash('error_msg', 'Houve um erro interno ao salvar o usuário')
                            res.redirect('/')
                        }

                        newUser.password = hash

                        newUser.save().then(() =>{
                            req.flash('success_msg', 'Usuário criado com sucesso')
                            res.redirect('/')
                        }).catch((err) => {
                            req.flash('error_msg', 'Houve um erro interno ao criar o usuário, tente novamente')
                            res.redirect('/user/register')
                        })
                    })
                })
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno')
            res.redirect('/')
        })
    }
})

module.exports = router