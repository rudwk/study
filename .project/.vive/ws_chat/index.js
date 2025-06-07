const express = require('express');
const app = express();
const ws = require('./webSocket');
const numjucks = require('nunjucks')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'html');
numjucks.configure('./static', {
    express: app,
    watch: true
})

app.get('/', (req, res) => {
    res.render('index.html');
});

const server = app.listen(8888, () => {
    console.log('ws server started');
});

ws(server);