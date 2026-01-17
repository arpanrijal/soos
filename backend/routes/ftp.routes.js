const express = require('express')
const router = express.Router();
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const userModel = require('../models/file')
const { year, month, day } = require("../controller/date_and_timehandler")
const filesizeConverter = require('../controller/bit_to_kb_mb_gb_tb')
const { FileDB, cloudinary } = require('../config/filedb.connect')
const UniqueFileNameSetter = require('../controller/filenameSet')
const resourceType = require('../controller/filetypefinder')

const uploadDir = path.join(__dirname, "..", "public", "data", "uploads")

if (!fs.existsSync(uploadDir)) {
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
        if (err) throw err
    });
}

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, `${uploadDir}`)
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + "-" + `${file.originalname}`);
//     }
// });
// const upload = multer({ storage: storage })

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024
    }
})

router.post('/ftp', upload.array('uploaded_files', 1000), async (req, res, next) => {
    const results = []
    try {
        for (const file of req.files) {
            const result = await new Promise(async (resolve, reject) => {
                const fileSize = await filesizeConverter(file.size)
                const filename = UniqueFileNameSetter(file.originalname)
                const publicId = path.parse(filename).name
                cloudinary.uploader.upload_stream(
                    {
                        public_id: publicId,
                        resource_type: "auto"
                    },
                    async (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(result)
                            await userModel.create({
                                filename: filename,
                                public_id: result.public_id,
                                mimetype: file.mimetype,
                                size: `${fileSize.sizedata}`,
                                size_text: `${fileSize.state}`,
                                createdat: `${year}-${month}-${day}`,
                                updatedat: null,
                                shareid: null,
                                status_file_or_todo: "file",
                            })
                        }
                    }
                ).end(file.buffer);
            })
            results.push(result);
        }
        res.status(200).json({
            message: "Files uploaded to Cloudinary successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Upload failed" });
    }
})

router.get('/ftp', async (req, res) => {
    try {
        const filesDetails = await userModel.find(); //yo "mongoos document"  return garxa so we need to convert it to plain object first then we can able to enumurate through object
        const fileData = filesDetails.map((file) => {
            let isImage = file.mimetype.startsWith('image/')
            let url = cloudinary.url(file.public_id, {
                resource_type: resourceType(file),
                ...(isImage && {
                    fetch_format: 'auto',
                    quality: 'auto'
                })
            })
            return {
                ...file.toObject(),
                fileURL: url
            }
        })
        res.json({
            fileINFO: fileData,
            isFiles: filesDetails.length === 0, //yo chai file xa vane file natra "no file exist" dekhauna lai send gareko ho hai
        });
    } catch (err) {
        console.error('Error fetching files:', err);
        res.status(500).send('Server Error');
    }
})
router.get('/ftp/download/:id/:value', async (req, res) => {
    const { id, value } = req.params
    try {
        const filedata = await userModel.findById(id)
        if (!filedata) {
            return res.status(404).send("No file found")
        }
        const filepath = path.join(__dirname, "..", "public", "data", "uploads", value)
        res.download(filepath, (err) => {
            if (err) {
                console.error("Download Error")
                res.status(500).send("Server error")
            }
        })

    } catch (err) {
        console.error("Error with us", err)
        res.status(500).send("Server error")
    }
})
router.delete('/ftp/deletefile/:id/:value', async (req, res) => {
    const { id, value } = req.params
    console.log(req.params)
    try {
        await userModel.findByIdAndDelete(id)
        const filepath = path.join(__dirname, "..", "public", "data", "uploads", value)
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error('Error occured during file deletion', err)
            }
        })
        res.send({
            sucess: true,
        })
    } catch (err) {
        console.error("Error with us", err)
        res.status(500).send("Server error")
    }
})

module.exports = router