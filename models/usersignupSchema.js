const mongoose = require('mongoose');

const UserloSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:String,
    lastname: String,
    gender: String,
    email:String,
    phone: Number,
    userType: String,
    password:String
})

module.exports = mongoose.model('Userlo', UserloSchema);