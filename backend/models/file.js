const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
    },
    public_id:{
        type: String,
    },
    mimetype: {
        type:String,
    },
    size: {
        type: Number,
    },
    size_text: {
        type:String,
    },
    createdat: String,
    updatedat: String,
    shareid: String,
})
const userModel = mongoose.model('files-data',fileSchema)
module.exports = userModel