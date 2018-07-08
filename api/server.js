'use strict';

const config = require('config');
const app = require('./app');

const Database = require('./lib/database');

const port = process.env.PORT || config.get('server.port');
const host = process.env.HOST || config.get('server.host');

Database.connectToDatabase();

app.listen(port, host, (err) => {
  if (err) throw err;
  console.log(`Running API on http://${host}:${port}`);
});
