const multer = require('multer');
const config = require('../config/upload');

const upload = multer(config).single('file');

function UploadVideo(req, res) {
  upload(req, res, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.end('Ocorreu um erro');
    }

    return res.end('Concluido');
  });
}

module.exports = UploadVideo;
