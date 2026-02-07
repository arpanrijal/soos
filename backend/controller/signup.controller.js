const { loginModel, passwordHash, jwtAccessToken } = require('../models/loginhandler')
const { year, month, day, hour, minute, sec } = require('./date_and_timehandler')

const signUpController = async (req, res) => {
    const { email, password } = req.body
    const username = email.trim().split('@')[0]
    const hashpassword = await passwordHash(password)
    try {
        const response = await loginModel.create({
            email: email,
            given_name: username,
            picture: "https://api.dicebear.com/9.x/adventurer/svg?seed=Aidan",
            createdAt: `${year}-${month}-${day}T${hour}:${minute}:${sec}Z`,
            updatedAt: null,
            Loginwith: "Website_login",
            password: hashpassword,
        })
        const token = jwtAccessToken(response._id)
        res.cookie('token', token)
        return res.status(200).json({
            status: true,
            message: 'Account created',
            email: email,
            username: username,
            token: token,
            profilepic: response.picture
        })
    } catch (error) {
        console.log("error in catch block in signup controller: ",error);
        return res.status(500).json({
            status: false,
            message: 'Something went wrong during Creating your Account',
            error: error.message,
        })
    }
}

module.exports = { signUpController }