const { loginModel } = require('../models/loginhandler')
const { validationResult } = require('express-validator')

const SignupAuth = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: "Validation failed",
            errors: errors.array(),
        })
    }
    const { email } = req.body
    try {
        const result = await loginModel.findOne({ email: email })
        if (result) {
            return res.status(409).json({
                status: false,
                message: 'Email already exists',
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: 'Something went wrong signup auth',
            error: err.message,
        })
    }
}

const loginAuth = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: "Validation failed",
            errors: errors.array(),
        })
    }
    const { email } = req.body
    try {
        const response = await loginModel.findOne({ email })
        if (!response) {
            return res.status(401).json({
                status: false,
                message: 'Either email or password is incorrect',
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: 'Something went wrong login auth',
            error: err.message,
        })
    }
}

module.exports = { SignupAuth, loginAuth }