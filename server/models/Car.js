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
    }
})

mongoose.model('car', Car)