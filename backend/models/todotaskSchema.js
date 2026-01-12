const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    todotask: {
        type: String,
        require: true,
        minlength: [1, "Please write a bit more (at least 1 characters)"]
    },
    createdat: String,
    updatedat: String,
    shareid: String,
})
const userModel = mongoose.model('task_lists',taskSchema)
module.exports = userModel