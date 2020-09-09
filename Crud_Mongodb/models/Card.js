const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('card', UserSchema)