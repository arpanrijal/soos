const { loginModel, compareHash, jwtAccessToken } = require('../models/loginhandler')
const { year, month, day, hour, minute, sec } = require('./date_and_timehandler')

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        try {
            const response = await loginModel.findOne({ email: email }).select('+password')
            const hashStatus = await compareHash(password, response.password)
            if (!hashStatus) {
                return res.status(500).json({
                    status: false,
                    message: 'Either E-mail or Password is incorrect'
                })
            }
            const token = jwtAccessToken(response._id)
            res.cookie('token', token)
            return res.status(200).json({
                status: true,
                message: 'Account loginin sucessfully',
                email: email,
                username: username,
                token: token,
                profilepic: response.picture
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Something went wrong during Creating your Account',
                error: error.message,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Something went wrong'
        })
    }
}
module.exports = { loginController }