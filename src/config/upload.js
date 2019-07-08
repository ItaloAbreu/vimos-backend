const multer = require('multer');
const path = require('path');

const acceptedExtensions = ['.mp4', '.avi', '.ogg'];

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname.split(' ').join('-')}`);
    },
  }),
  fileFilter(req, file, callback) {
    if (acceptedExtensions.includes(path.extname(file.originalname))) {
      return callback(null, true);
    }
    return callback(new Error('Wrong file type.'));
  },
};
