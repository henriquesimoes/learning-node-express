'use strict';

const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

module.exports = () => {
  const dbHost = process.env.DBHOST || config.get('db.host');
  const dbName = process.env.DBNAME || config.get('db.name');
  const dbPort = process.env.DBPORT || config.get('db.port');
  const dbUser = process.env.DBUSER || config.get('db.user');
  const dbPass = process.env.DBPASS || config.get('db.pass');

  mongoose.set('useFindAndModify', false);

  mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authMechanism=SCRAM-SHA-1`, { useNewUrlParser: true })
    .then(() => {
      return winston.info(
        `Connected to database ${dbName} (at ${dbHost}:${dbPort})`);
    })
    .catch((err) => {
      winston.error(err);
      throw err;
    });
};
