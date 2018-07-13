'use strict';

const debug = require('debug')('api:error');

module.exports = (err, req, res, next) => {
  debug(err);
  res.status(500).send('Something failed.');
};
