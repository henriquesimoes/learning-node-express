'use strict';

const express = require('express');
const config = require('config');
const app = express();

const staff = require('./router/staff');

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/staff', staff);

module.exports = app;