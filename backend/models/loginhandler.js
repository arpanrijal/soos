const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const LoginDetails = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    given_name: {
        type: String,
        require: true,
    },
    picture: {
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
        enum: ["google", "Website_login"],
        require: true,
        select: false
    },
    password: {
        type: String,
        required: function () {
            return this.Loginwith === 'Website_login'
        },
        select: false
    },
    googleId: {
        type: String,
        require: function () {
            return this.Loginwith === 'google' //this print true of false
        }
    }
})
async function passwordHash(password) {
    return await bcrypt.hash(password, 10)
}
async function compareHash(password, hashPassword){
    return await bcrypt.compare(password, hashPassword)
}

async function jwtAccessToken(id){
    return jwt.sign({id}, process.env.JSONWEBTOKENSECRET, {expiresIn: 60*60*24*30*12})
}

const loginModel = mongoose.model('Login Details', LoginDetails)
module.exports = { loginModel, passwordHash, compareHash, jwtAccessToken }