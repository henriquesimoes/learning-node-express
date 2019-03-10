'use strict';
const config = require('config');
const winston = require('winston');

const app = require('./app');

const port = process.env.PORT || config.get('server.port');
const host = process.env.HOST || config.get('server.host');

app.listen(port, host, (err) => {
  if (err) return winston.error(err.message, err);
  winston.info(`Listening on http://${host}:${port}`);
});
