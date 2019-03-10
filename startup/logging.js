'use strict';

const winston = require('winston');
require('express-async-errors');

module.exports = () => {
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  winston.add(winston.transports.File, {
    name: 'file.error',
    filename: 'errors.log',
    level: 'error' }
  );
  winston.handleExceptions(
    new winston.transports.Console({
      name: 'console',
      colorize: true,
      prettyPrint: true
    }),
    new winston.transports.File({
      name: 'file.exceptions',
      filename: 'exceptions.log'
    })
  );
};
