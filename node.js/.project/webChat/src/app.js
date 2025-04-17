const express = require('express');
const bodyPasser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8888;

app.use(cors());

app.use(bodyPasser.json());

app.use(bodyPasser.urlencoded({extended: true}));

app.use('/', require("./app/mysql/route/route.js"));

const db = require('./app/mysql/')