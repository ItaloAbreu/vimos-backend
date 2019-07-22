const multer = require('multer');
const path = require('path');

const ACCEPTED_EXTENSIONS = ['.mp4', '.avi', '.ogg'];
const SIZE_LIMIT = 512 * 1024 * 1024;

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname.split(' ').join('-')}`);
    },
  }),
  fileFilter(req, file, callback) {
    if (!ACCEPTED_EXTENSIONS.includes(path.extname(file.originalname))) {
      return callback(new Error('Wrong file type.'));
    }
    return callback(null, true);
  },
  limits: {
    fileSize: SIZE_LIMIT,
  },
};
