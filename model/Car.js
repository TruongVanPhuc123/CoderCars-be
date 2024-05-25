const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    style: { type: String, required: true },
    size: { type: String, required: true },
    transmission_type: { type: String, required: true },
    price: { type: Number, required: true },
    release_date: { type: Number, required: true },
})

const Car = mongoose.model('cars', carSchema)
module.exports = Car;