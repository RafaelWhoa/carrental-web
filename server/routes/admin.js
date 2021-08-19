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
        req.flash('success_msg', 'Agencia adicionada com sucesso')
        res.redirect('/admin/agencies')
    }).catch(err => {
        req.flash('error', 'Houve um erro interno ao adicionar a agência')
        res.redirect('/admin/agencies')
    })
})

router.get('/', (req, res) => {
    res.render('admin')
})

router.get('/agencies', (req, res) => {
    Agency.find().lean().then((agency) => {
        res.render('admin/agencies', {agency:agency})
    }).catch((err) => {
        res.redirect('/500')
    })
})

router.get('/agencies/new-agency', (req, res) => {
    res.render('admin/newAgency')
})

router.post('/agencies/newCar', (req, res) => {
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
        req.flash('success_msg', 'Agência deletada com sucesso')
        res.redirect('/admin/agencies')
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao deletar a agência')
        res.redirect('/admin/agencies')
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