const express = require('express');
const multer = require('multer');
const uploadsConfig = require('./config/upload');
const VideoController = require('./controllers/VideoController');
const { StreamVideos, SendThumbnail } = require('./controllers/SendFiles');

const routes = new express.Router();
const UploadVideo = multer(uploadsConfig).single('video');

routes.use('/', express.static(`${__dirname}/public`));

routes.get('/list', VideoController.index);
routes.post('/video/storage', UploadVideo, VideoController.storage);
routes.get('/video/:id', VideoController.show);
routes.put('/video/:id', VideoController.update);
routes.delete('/video/:id', VideoController.delete);

routes.get('/play/:movie', StreamVideos);
routes.get('/thumb/:thumbnail', SendThumbnail);

module.exports = routes;
