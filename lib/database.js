'use strict';

const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('api:db');

const MONGO_URL = config.get('db.driver') + '://' +
    config.get('db.host') + ':' +
    config.get('db.port') + '/';

const defaultDb = config.get('db.name');

/**
 * Class that enables connect to MongoDB
 */
class Database {
  /**
   * Creates a connection to database
   * @param {string} [dbName] Database name
   */
  static async connectToDatabase (dbName) {
    dbName = dbName || defaultDb;

    mongoose.connect(MONGO_URL + dbName, {useNewUrlParser: true})
      .then(() => {
        return debug(`Connected to ${dbName}`);
      })
      .catch((err) => {
        debug(`Error occured when trying to connect to ${dbName}.`);
        debug('Error: ' + err.message);
      });
  }
}

module.exports = Database;
