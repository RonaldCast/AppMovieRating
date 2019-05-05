/* eslint-disable */

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
     name: {
       type: String,
       required: [true, "Error al ingresar el nombre debe de establecerser"]
     },
    description: String,
    release_year: Number,
    genre: String
})

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie