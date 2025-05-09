const userRouter = require('./routh/userRouther');

const express = require('express');
const app = express();
const port = 8888;

app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send("<h1>Hello World</h1>")
});

app.listen(port, () => {
  console.log(`server is running in localhost:${port}`);
});