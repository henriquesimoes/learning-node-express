'use strict';

const express = require('express');
const app = express();
// const passport = require("./lib/auth");

const staff = require('./staff').router;
const user = require('./user').router;

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(passport.authenticate('basic', {session: false}));

app.use('/staffs', staff);
app.use('/users', user);

module.exports = app;
