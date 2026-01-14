import { v2 as cloudinary } from 'cloudinary';

const FileDB = async ()=>{
    cloudinary.config({ 
        cloud_name: `${process.env.FILE_STORAGE_DB_CLOUD_NAME}`, 
        api_key: `${process.env.FILE_STORAGE_DB_APIKEY}`, 
        api_secret: `${process.env.FILE_STORAGE_DB_KEY}` 
    });
}

export default FileDB