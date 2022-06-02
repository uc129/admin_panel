const { default: mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    date_of_birth:Date,
    location:String,
    isMember:Boolean,
    company:String,
    date_created:{type:Date,default:Date.now()},
})
const userModel = mongoose.model('User Model', userSchema)
module.exports = userModel