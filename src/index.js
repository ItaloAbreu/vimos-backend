const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const internalIp = require('internal-ip');

const port = process.env.PORT || 8000;
const server = express();
require('dotenv').config();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

mongoose.connect(
  process.env.MONGO,
  { useUnifiedTopology: true, useNewUrlParser: true },
);
require('./models/VideoModel');

server.use(require('./routes'));

server.listen(port, () => process.stdout.write(`
  Server rodando.
  http://localhost:${port}
  http://${internalIp.v4.sync()}:${port}
`));
