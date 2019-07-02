const express = require('express');
const cors = require('cors');

const port = process.argv[2] || 9091;
const app = express();

app.use(cors());

app.listen(port, () => process.stdout.write(`
  Server rodando.
  http://localhost:${port}
`));
