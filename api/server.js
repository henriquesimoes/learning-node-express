'use strict';

const config = require('config');
const app = require('./lib/app');
const debug = require('debug')('api:startup');

const Database = require('./lib/database');

const port = process.env.PORT || config.get('server.port');
const host = process.env.HOST || config.get('server.host');

Database.connectToDatabase();

app.listen(port, host, (err) => {
  if (err) throw err;
  debug(`Running API on http://${host}:${port}`);
});
