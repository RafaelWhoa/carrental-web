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

router.get('/cars', (req, res) => {
    Car.find().lean().populate('agency').then((car) => {
        res.render('admin/cars', { car: car})
    }).catch((err) => {
        res.redirect('/500')
    })
})

router.get('/cars/new', (req, res) => {
    Agency.find().lean().then((agency) => {
        res.render('admin/newCar', {agency:agency})
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

    new Car(newCar).save().then(() => {
        req.flash('success_msg', 'Carro registrado com sucesso')
        res.redirect('/admin/cars')
    }).catch(err => {
        req.flash('error_msg', 'Houve um erro ao registrar o carro')
        res.redirect('/admin/cars')
    })
})

router.get('/cars/edit/:id', (req, res) => {
    Car.findOne({_id: req.params.id}).lean().then((car) => {
        Agency.find().lean().then((agency) => {
            res.render('admin/editCar', {agency:agency, car:car})
        }).catch((err) => {
            req.flash('error_msg', 'Este veículo não existe')
            res.redirect('/admin/cars')
        })
        })
})

router.post('/api/editCar', (req, res) => {
    Car.findOne({_id: req.body.id}).then((car) => {
        car.brand = req.body.brand
        car.model = req.body.model
        car.VIN = req.body.VIN
        car.licensePlate = req.body.licensePlate
        car.agency = req.body.agency

        car.save().then(() => {
            req.flash('success_msg', 'Veículo editado com sucesso')
            res.redirect('/admin/cars')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno ao editar o veículo')
            res.redirect('/admin/cars')
        })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao editar o veículo')
        res.redirect('/admin/cars')
    })
})

router.post('/api/deleteCar', (req, res) => {
    Car.deleteOne({_id: req.body.id}).then((car) => {
        req.flash('success_msg', 'Veículo deletado com sucesso')
        res.redirect('/admin/cars')
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao deletar o veículo')
        req.redirect('/admin/cars')
    })
})

router.get('/agencies/edit-agency/:id', (req, res) => {
    Agency.findOne({_id: req.params.id}).lean().then((agency) => {
        res.render('admin/editAgency', {agency:agency})
    }).catch((err) => {
        req.flash('error_msg', 'Esta agência não existe')
        res.redirect('/admin/agencies')
    })
})

router.post('/api/editAgency', (req, res) => {
    Agency.findOne({_id: req.body.id}).then((agency) => {
        agency.name = req.body.name
        agency.city = req.body.city
        agency.address = req.body.address

        agency.save().then(() => {
            req.flash('success_msg', 'Agência editada com sucesso')
            res.redirect('/admin/agencies')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno ao editar a agência')
            res.redirect('/admin/agencies')
        })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao editar a agência')
        res.redirect('/admin/agencies')
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