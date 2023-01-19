'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const home = require('./routes/home');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/js', express.static(`${__dirname}/js`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', home);
module.exports = app;