const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../models/Agency')
const Agency = mongoose.model('agency')

router.post('/api/newAgency', (req, res) => {
    const newAgency = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city
    }

    console.log(newAgency)

    new Agency(newAgency).save().then(() => {
        console.log('Agency created!')
    }).catch(err => {
        console.log(err)
    })
})

router.get('/', (req, res) => {
    res.send('Salve de novo')
})

module.exports = router