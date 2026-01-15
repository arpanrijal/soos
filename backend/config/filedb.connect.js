const cloudinary = require('cloudinary').v2;
const FileDB = async ()=>{
    cloudinary.config({ 
        cloud_name: `${process.env.FILE_STORAGE_DB_CLOUD_NAME}`, 
        api_key: `${process.env.FILE_STORAGE_DB_APIKEY}`, 
        api_secret: `${process.env.FILE_STORAGE_DB_KEY}` 
    });
    console.log("connected to cloudnary");
    
}

module.exports = {FileDB, cloudinary}