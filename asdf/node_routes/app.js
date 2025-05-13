const express = require('express');
const app = express();
const host = 'localhost'
const port = 8888;

const router = require('./routes/router');

app.get("/", (req, res)=>{
    res.json({message: "Hello World"});
})

app.use("/bye", router);

app.listen(port, () => {
    console.log(`server is running in http://${host}:${port}`);
});