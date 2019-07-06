const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination(req, res, callback) {
      callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname.split(' ').join('-')}`);
    },
  }),
};
