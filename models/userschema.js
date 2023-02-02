const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:String,
    lastname: String,
    gender: String,
    email:String,
    phone: Number
})

module.exports = mongoose.model('User', UserSchema);