const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloud_name = "johnjohn";
const api_key = "183443573911853";
const api_secret = "LYF35Uvl4xCWIbSUGOQvxmKemIw";

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Items',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

const upload = multer({ storage: storage }).single('photo');

module.exports = { upload };
