'use strict';

const User = require('./model');
const controller = require('./controller');
const validator = require('./validator');
const router = require('./router');

module.exports = {
  User,
  controller,
  router,
  validator
};
