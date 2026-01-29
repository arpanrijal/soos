const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
    },
    public_id: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    size: {
        type: Number,
    },
    size_text: {
        type: String,
    },
    createdat: {
        type: String
    },
    updatedat: {
        type: String
    },
    shareid: {
        type: {
            public_id: {
                type: String,
                unique: true,
            },
            private_id: {
                id: {
                    type: String,
                    unique: true,
                },
                users: {
                    username: {
                        type: String
                    },
                    limit: {
                        type: Number,
                        default: null
                    },
                }
            },
        },
        select: false
    },
    // accessid: {
    //     type: {
    //         public_id: {
    //             type: String
    //         },
    //         private_id: {
    //             id_info: {
    //                 id: {
    //                     type: String,
    //                 },
    //                 limit: {
    //                     type: Number
    //                 },
    //             },
    //         },
    //     },
    //     select: false,
    // },
})
const userModel = mongoose.model('files-data', fileSchema)
module.exports = userModel