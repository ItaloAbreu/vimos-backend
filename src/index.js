const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.argv[2] || 9091;
const server = express();

mongoose.connect(
  'mongodb://localhost:27017/vimosapi',
  { uesNewUrlParser: true },
);

server.use(cors());

server.use(require('./routes'));

server.listen(port, () => process.stdout.write(`
  Server rodando.
  http://localhost:${port}
`));
