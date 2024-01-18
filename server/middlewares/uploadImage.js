const multer = require('multer');

const storage = multer.memoryStorage(); // Store the image data in memory as Buffer
const uploadImage = multer({ storage: storage });

module.exports = uploadImage;
