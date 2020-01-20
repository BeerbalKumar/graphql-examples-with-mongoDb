const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://beerbalkumar:beerbalkumar@cluster0-yijsg.mongodb.net/test?retryWrites=true&w=majority")

module.exports = mongoose;