const mongoose = require('mongoose')
function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to Database Sucessfully')
    })
}
module.exports = connectToDB