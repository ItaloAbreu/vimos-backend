const express = require('express');

const routes = new express.Router();

routes.get('/list', (req, res) => {
  res.json('"list":{}');
});

routes.get('/video/:id', (req, res) => {
  const { id } = req.params;

  res.send(`<h1>Video '${id}' solicitado.</h1>`);
});


module.exports = routes;
