'use strict';

const mongodb = require('mongodb');
const config = require('config');

const MongoClient = mongodb.MongoClient;

const MONGO_URL = config.get('db.driver') + '://' 
    + config.get('db.host') + ':' 
    + config.get('db.port') + '/';

class Database {
    static connectToDatabase(dbName, callback){
        MongoClient.connect(MONGO_URL, (err, db) => {
            if(err) {
                callback(err);
            }
            else{
                this.db = db.db(dbName);
                callback(null);
            }
        });
    }
    static createObjectID(value){
        return new mongodb.ObjectID(value);
    }
}

module.exports = Database;