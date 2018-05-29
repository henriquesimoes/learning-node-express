'use strict';

const config = require('config');
const app = require('./app');

const database = require('./lib/database');

const PORT = config.get('server.port');
const HOST = config.get('server.host');
const DATABASE = config.get('db.name');

database.connectToDatabase(DATABASE, (err) => {
  if (err) {
    console.log('Database is not up...');
    console.error('Error:' + err.message);
  } else {
    console.log('Database "' + database.db.databaseName + '" is up...');
  }
});

app.listen(PORT, HOST, (err) => {
  if (err) throw err;
  console.log(`Running API on http://${HOST}:${PORT}`);
});
