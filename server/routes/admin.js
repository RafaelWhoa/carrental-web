const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../models/Agency')
const Agency = mongoose.model('agency')
require('../models/Car')
const Car = mongoose.model('car')

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
    res.render('admin')
})

router.get('/agencies', (req, res) => {
    Agency.find().lean().then((agency) => {
        res.render('agencies', {agency:agency})
    }).catch((err) => {
        res.redirect('/500')
    })
})

router.post('/api/newCar', (req, res) => {
    const newCar = {
        brand: req.body.brand,
        model: req.body.model,
        VIN: req.body.VIN,
        licensePlate: req.body.licensePlate,
        agency: req.body.agency
    }

    console.log(newCar)

    new Car(newCar).save().then(() => {
        console.log('Car saved!')
    }).catch(err => {
        console.log(err)
    })
})

router.post('/api/deleteAgency', (req, res) => {
    Agency.deleteOne({_id: req.body.id}).then((agency) => {
        console.log('Agency deleted!')
    }).catch((err) => {
        console.log(err)
    })
})

router.post('/api/deleteCar', (req, res) => {
    Car.deleteOne({_id: req.body.id}).then((car) => {
        console.log('Car deleted!')
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router