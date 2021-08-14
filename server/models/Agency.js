const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Agency = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

mongoose.model('agency', Agency)