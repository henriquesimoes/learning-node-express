'use strict';

const mongoose = require('mongoose');
const config = require('config');

const MONGO_URL = config.get('db.driver') + '://' +
    config.get('db.host') + ':' +
    config.get('db.port') + '/';

const defaultDb = config.get('db.name');

/**
 * Class that enables connect to MongoDB
 */
class Database {
  /**
   * Create connection to database and provide it through 'db' variable
   * @param {string} [dbName] Database name
   */
  static connectToDatabase (dbName) {
    dbName = dbName || defaultDb;

    mongoose.connect(MONGO_URL + dbName, {useNewUrlParser: true});
  }
}

module.exports = Database;
