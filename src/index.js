const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = process.argv[2] || 9091;
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

mongoose.connect(
  'mongodb://localhost:27017/vimosapi',
  { useNewUrlParser: true },
);
require('./models/VideoModel');

server.use(require('./routes'));

server.listen(port, () => process.stdout.write(`
  Server rodando.
  http://localhost:${port}
`));
