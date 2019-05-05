/* eslint-disable */

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    movieId: String, 
    userId: String,
    rate: Number
})

const Rating = mongoose.model('Rating', RatingSchema)

module.exports = Rating
