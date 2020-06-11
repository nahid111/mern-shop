const multer = require("multer");
const ErrorResponse = require('../utils/errorResponse');


const storageOptions = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.FILE_UPLOAD_PATH),
  filename: (req, file, cb) =>
    cb(null, new Date().toISOString() + "-" + file.originalname),
});

const filterOptions = (req, file, cb) => {
  if (file.size > process.env.MAX_FILE_SIZE) {
    return cb(new ErrorResponse(400, `Out of limit`), false);
  }
  if (file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg' || file.mimetype==='image/svg+xml') {
    return cb(null, true);
  }
  cb(new ErrorResponse(400, `Please upload an image file`), false);
};


const multerFileUpload = multer({
  storage: storageOptions,
  limits: {
    // files: process.env.MAX_FILE_LIMIT,
    fileSize: process.env.MAX_FILE_SIZE,
  },
  fileFilter: filterOptions,
});


module.exports = multerFileUpload;

