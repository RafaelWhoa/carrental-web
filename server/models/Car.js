const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Car = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    VIN: {
        type: String,
        required: true
    },
    licensePlate: {
        type: String,
        required: true
    },
    agency: {
        type: Schema.Types.ObjectId,
        ref: 'agency',
        required: true
    },
    isRented: {
        type: Number,
        default: 0
    },
    rentedAt: {
        type: Date,
        default: Date(0)
    },
    rentedUntil: {
        type: Date,
        default: Date(0)
    },
    rentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    ageUnder25Allowed: {
        type: Number,
        default: 0
    }
})

mongoose.model('car', Car)