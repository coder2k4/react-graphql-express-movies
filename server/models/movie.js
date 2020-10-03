const mongoose = require('mongoose')

const Shema = mongoose.Schema

const movieSchema = new Shema({
    name: String,
    genre: String,
    director: String,
    rate: Number,
    watched : Boolean
})

module.exports = mongoose.model('Movie', movieSchema)