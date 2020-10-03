const mongoose = require('mongoose')

const Shema = mongoose.Schema

const directorSchema = new Shema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Directors', directorSchema)