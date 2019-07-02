const express = require('express');

const port = 9091;
const app = express();

app.listen(port, () => console.log(`
  Server rodando.
  http://localhost:${port}
`));
