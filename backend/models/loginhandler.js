const mongoose = require('mongoose')
const LoginDetails = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    given_name:{
        type: String,
        require: true,
    },
    picture:{
        type: String
    },
    createdAt: {
        type: String,
        require: true,
    },
    updatedAt: {
        type: String
    },
    Loginwith: {
        type: String,
        enum: ["google","Website login"],
        require: true
    },
    googleId: {
        type: String,
        require: function (){
            return this.Loginwith === 'google'
        }
    }
})
const loginModel = mongoose.model('Login Details', LoginDetails)
module.exports = loginModel