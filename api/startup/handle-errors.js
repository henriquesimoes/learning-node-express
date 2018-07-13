'use strict';

const debug = require('debug')('api:error');

module.exports = () => {
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  process.on('uncaughtException', (ex) => {
    debug(ex);
  });
};
