const mongoose = require('mongoose')

const Shema = mongoose.Schema

const movieSchema = new Shema({
    name: String,
    genre: String,
    directorId: String
})

module.exports = mongoose.model('Movie', movieSchema)