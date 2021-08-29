const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('user');

router.get('/register', (req, res) => {
    res.render('user/register')
})

module.exports = router