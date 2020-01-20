const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name:String,
    genre:String
})

const Books = mongoose.model("books",bookSchema);

module.exports = Books;