const express = require('express');
const userModel = require('../models/todotaskSchema');
const router = express.Router();



router.get('/about', (req, res, next) => {
    console.log("Sucessfully come in middleware")
    next()
}, (req, res) => {
    res.render('about')
})


router.get('/message', (req, res, next) => {
    console.log("Sucessfully come in middleware")
    next()
}, (req, res) => {
    res.render('message')
})


router.get('/contact', (req, res, next) => {
    console.log("Sucessfully come in middleware")
    next()
}, (req, res) => {
    res.render('contact')
})

// router.get('/ftp', (req,res,next) => {
//     console.log("Sucessfully come in middleware")
//     next()
// }, (req, res) => {
//     res.render('ftp')
// })


module.exports = router;