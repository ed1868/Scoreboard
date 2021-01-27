const cloudinary = require('cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = cloudinaryStorage({
//   cloudinary,
//   folder: 'react', // The name of the folder in cloudinary
//   allowedFormats: ['jpg', 'png'],
//   filename(req, file, cb) {
//     cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
//   },
// });


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dudesBallOut',
    format: async (req, file) => ['png','jpg'], // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },
});


const parser = multer({ storage: storage });

module.exports = parser;