const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Data', dataSchema)