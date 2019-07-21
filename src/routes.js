const express = require('express');
const multer = require('multer');
const uploadsConfig = require('./config/upload');
const VideoController = require('./controllers/VideoController');
const { StreamVideos, SendThumbnail } = require('./controllers/SendFiles');

const routes = new express.Router();
const UploadVideo = multer(uploadsConfig).single('video');

routes.use('/', express.static(`${__dirname}/public`));

routes.get('/api/list', VideoController.index);
routes.post('/api/video/storage', UploadVideo, VideoController.storage);
routes.get('/api/video/:id', VideoController.show);
routes.put('/api/video/:id', VideoController.update);
routes.delete('/api/video/:id', VideoController.delete);

routes.get('/api/play/:movie', StreamVideos);
routes.get('/api/thumb/:thumbnail', SendThumbnail);

module.exports = routes;
