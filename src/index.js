const express = require('express');
const cors = require('cors');

const port = process.argv[2] || 9091;
const server = express();

server.use(cors());

server.use(require('./routes'));

server.listen(port, () => process.stdout.write(`
  Server rodando.
  http://localhost:${port}
`));
