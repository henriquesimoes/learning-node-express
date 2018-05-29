'use strict';

const mongodb = require('mongodb');
const config = require('config');

const MongoClient = mongodb.MongoClient;

const MONGO_URL = config.get('db.driver') + '://' +
    config.get('db.host') + ':' +
    config.get('db.port') + '/';
/**
 * Class that enables connect to databases
 */
class Database {
  /**
   * Create connection to database and provide it through 'db' variable
   * @param {string} dbName Database name
   * @param {fn} callback Callback function
   */
  static connectToDatabase (dbName, callback) {
    MongoClient.connect(MONGO_URL, (err, db) => {
      if (err) {
        callback(err);
      } else {
        this.db = db.db(dbName);
        callback(null);
      }
    });
  }
  /**
   * Create an MongoDB ObjectID object
   * @param {int} id
   * @return {ObjectID}
   */
  static createObjectID (id) {
    return new mongodb.ObjectID(id);
  }
}

module.exports = Database;
