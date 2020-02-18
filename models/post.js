let mongoose = require('mongoose')

// Creating Journal Post model
const postSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    content: String,
    date: Date
})

module.exports = mongoose.model('Post', postSchema)