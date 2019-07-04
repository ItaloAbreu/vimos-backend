const express = require('express');
const VideoController = require('./controllers/VideoController');
const StreamVideos = require('./controllers/StreamVideos');

const routes = new express.Router();

routes.get('/list', VideoController.index);
routes.post('/video/storage', VideoController.storage);
routes.get('/video/:id', VideoController.show);
routes.put('/video/:id', VideoController.update);
routes.delete('/video/:id', VideoController.delete);

routes.get('/play/:movie', StreamVideos);

module.exports = routes;
