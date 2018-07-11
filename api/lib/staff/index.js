'use strict';

const Staff = require('./model');
const controller = require('./controller');
const router = require('./router');
const validator = require('./validator');

module.exports = {
  Staff,
  controller,
  router,
  validator
};
