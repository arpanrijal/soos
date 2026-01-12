const express = require('express')
const router = express.Router()
const loginModel =require('../models/loginhandler')
const {year,month,day,hour,minute,sec} = require('../controller/date_and_timehandler')
const jwtdecode = require('jwt-decode')

router.post('/signup/google', async (req,res) => {
    try{
        const {userToken} = req.body
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
router.post('/signup', async (req,res)=>{
    try{
         await loginModel.create({
        email: userCredentialData.email,
            given_name: userCredentialData.given_name,
            picture: userCredentialData.picture,
            createdAt: `${year}-${month}-${day}T${hour}:${minute}:${sec}Z`,
            updatedAt: null,
            Loginwith: "Website login"
    })
    res.status(200).json({
        message: 'Account created Sucessfully'
    })
    }catch{
         res.status(500).json({
            message: 'Something went wrong during Creating your Account'
        })
    }
})
module.exports = router;