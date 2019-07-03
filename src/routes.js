const express = require('express');
const VideoController = require('./controllers/VideoController');

const routes = new express.Router();

routes.get('/list', VideoController.index);
routes.post('/video/upload', VideoController.upload);
routes.get('/video/:id', VideoController.show);
routes.put('/video/:id', VideoController.update);
routes.delete('/video/:id', VideoController.delete);

module.exports = routes;
