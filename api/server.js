'use strict';

const config = require('config');
const app = require('./app');

const database = require('./lib/database');

const PORT = process.env.PORT || config.get('server.port');
const HOST = process.env.HOST || config.get('server.host');
const DATABASE = config.get('db.name');

database.connectToDatabase(DATABASE, (err) => {
  if (err) {
    console.log('Database is not up...');
    throw err;
  } else {
    console.log('Database "' + database.db.databaseName + '" is up...');
  }
});

app.listen(PORT, HOST, (err) => {
  if (err) throw err;
  console.log(`Running API on http://${HOST}:${PORT}`);
});
