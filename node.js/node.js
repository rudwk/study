const express = require('express');
const app = express();

const port = 8888;

app.get('/', (req, res) => {
  res.send("<h1>Hello NodeJs</h1>");
});

app.listen(port, () => {
  console.log('server is running in localhost:' + port);
});