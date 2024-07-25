import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.v2.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary : cloudinary.v2,
    params : {
        folder : 'car_rental',
        allowedFormats : ['jpg', 'png', 'jpeg']
    },
});

const upload = multer({ storage : storage });
export default upload;