'use strict';
const helmet = require('helmet');
const express = require('express');
// const passport = require("./lib/auth");

require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();

const app = express();

const staffs = require('./lib/staff').router;
const users = require('./lib/user').router;
const error = require('./middleware/error');

app.use(helmet());
app.use(express.json());
// app.use(passport.authenticate('basic', {session: false}));

app.use('/staffs', staffs);
app.use('/users', users);
app.use(error);

module.exports = app;
