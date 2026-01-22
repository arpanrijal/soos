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
const { Readable } = require('stream')

const uploadDir = path.join(__dirname, "..", "public", "data", "uploads")

if (!fs.existsSync(uploadDir)) {
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
        if (err) throw err
    });
}

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
                const publicId = path.parse(filename).name.trim()
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
                            isFile = false
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
            let isImage = file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/pdf')
            let url = cloudinary.url(file.public_id, {
                resource_type: resourceType(file),
                transformation: [
                    {
                        width: 600,
                        height: 400,
                        crop: 'limit'
                    }
                ],
                ...(isImage && {
                    fetch_format: 'auto',
                    quality: 'auto:good'
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
router.get('/ftp/download/:id', async (req, res) => {
    const { id } = req.params
    try {
        const filedata = await userModel.findById(id)
        if (!filedata) {
            return res.status(404).send("No file found")
        }
        const safeFilename = filedata.filename.replace(/^\d+-/, "").trim();
        let url = cloudinary.url(filedata.public_id, {
            resource_type: resourceType(filedata),
            sign_url: true,
            secure: true,
            expires_at: Math.floor(Date.now() / 1000) + 3600,
        })
        try { //server bata download force garxa but to maintain load we transfer this load to cloudnary server
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            const contentType = filedata.mimetype || response.headers.get('content-type') || 'application/octet-stream';
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${safeFilename}"`
            ); res.setHeader(
                "Content-Type",
                contentType
            );
            const contentLength = response.headers.get("content-length")
            if (contentLength) {
                res.setHeader("Content-Length", contentLength);
            }

            Readable.fromWeb(response.body).pipe(res)
        } catch (error) {
            console.error('Error downloading remote file:', error);
            res.status(500).send('Error downloading the file.');
        }
    } catch (err) {
        console.error("Error with us", err)
        res.status(500).send("Server error")
    }
})
router.delete('/ftp/deletefile', async (req, res) => {
    const file = req.query
    const { _id, public_id } = file
    try {
        await cloudinary.uploader.destroy(public_id, {
            resource_type: resourceType(file)
        })
        await userModel.findByIdAndDelete(_id)
        res.send({
            sucess: true,
        })
    } catch (err) {
        console.error("Error with us", err)
        res.status(500).send("Server error")
    }
})

module.exports = router