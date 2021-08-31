const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('user');

router.get('/register', (req, res) => {
    res.render('user/register')
})

router.post('/api/register', (req, res) => {
    
    var errors = []

    if(req.body.name || typeof req.body.name == undefined || req.body.name == null) {

        errors.push({text: "Nome inválido"})
    }

    if(req.body.email || typeof req.body.email == undefined || req.body.email == null) {

        errors.push({text: "Email inválido"})
    }

    if(req.body.password || typeof req.body.password == undefined || req.body.password == null) {

        errors.push({text: "Senha inválida"})
    }

    if(req.body.password != req.body.password2){

        errors.push({text: "Senhas diferentes"})
    }

    if(errors.length > 0){
        res.render('user/register', {errors: errors})
    }
})

module.exports = router