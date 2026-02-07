const express = require('express')
const router = express.Router()
const { loginModel, compareHash, passwordHash, jwtAccessToken } = require('../models/loginhandler')
const { year, month, day, hour, minute, sec } = require('../controller/date_and_timehandler')
const jwtdecode = require('jwt-decode')
const { SignupAuth, loginAuth } = require('../middlewares/auth.middleware')
const { signUpController } = require('../controller/signup.controller')
const { loginController } = require('../controller/login.controller')
const { body, validationResult } = require('express-validator')
const { limiter } = require('../middlewares/ratelimiter.middleware')
//1st task to do: setup middle with expressvalidator
router.post('/signup/google', async (req, res) => {
    try {
        const { userToken } = req.body
        userCredentialData = jwtdecode(userToken)
        // const searchresult = await loginModel.findById(userCredentialData.sub)
        // if(searchUser.googleId === userCredentialData.sub){
        await loginModel.create({
            email: userCredentialData.email,
            given_name: userCredentialData.given_name,
            picture: userCredentialData.picture,
            createdAt: `${year}-${month}-${day}T${hour}:${minute}:${sec}Z`,
            updatedAt: null,
            Loginwith: "google",
            googleId: userCredentialData.sub,
        })
        // }
        res.status(200).json({
            message: 'Login Sucessfully'
        })
    } catch {
        res.status(500).json({
            message: 'Something went wrong during Login through Google Account'
        })
    }
})
router.post('/signup', limiter, [body('email').trim().isEmail().withMessage('Please enter a valid email address').isLength({ min: 7 }).withMessage('Not a valid e-mail address'), body('password').notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter').matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter').matches(/[0-9]/).withMessage('Password must contain at least one number').matches(/[@$!%*?&#><.\|"':;)({}[\]\-_+*/,=]/).withMessage('Password must contain at least one special character like @$!% and so on!')], SignupAuth, signUpController);
router.post('/login', limiter, [body('email').trim().isEmail().withMessage('Please enter a valid email address').isLength({ min: 7 }).withMessage('Not a valid e-mail address'), , body('password').notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter').matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter').matches(/[0-9]/).withMessage('Password must contain at least one number').matches(/[@$!%*?&#><.\|"':;)({}[\]\-_+*/,=]/).withMessage('Password must contain at least one special character like @$!% and so on!')], loginAuth, loginController)
module.exports = router;