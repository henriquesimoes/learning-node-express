'use strict';

const Database = require('../lib/database');
const User = require('../model/user');

const COLLECTION_NAME = 'user';

/**
 * Insert a new user into the database
 * @param {Object} userData User data to be inserted into database
 * @param {fn} done Callback function
 */
function insertUser (userData, done) {
  let user = new User(userData);
  Database.db.collection(COLLECTION_NAME)
    .insertOne(user.insertFormat, (err, result) => {
      if (err) return done(err);
      done(null, result);
    });
}
/**
 * Delete user based on filter
 * @param {Object} filter Filter used to delete user
 * @param {fn} done Callback function
 */
function deleteUser (filter, done) {
  Database.db.collection(COLLECTION_NAME).deleteOne(filter, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
}
/**
 * Update filtered user's data
 * @param {Object} filter Filter used to find user
 * @param {Object} userData Updated data
 * @param {fn} done Callback function
 */
function updateUser (filter, userData, done) {
  let user = new User(userData);
  Database.db.collection(COLLECTION_NAME)
    .updateOne(filter, {$set: user.updateFormat}, (err, result) => {
      if (err) return done(err);
      done(null, result);
    });
}
/**
 * Retrieve users based on the search filter
 * @param {Object} filter Filter used to select users
 * @param {fn} done Callback function
 */
function retrieveUsers (filter, done) {
  if (filter && filter._id) {
    filter._id = User.objectId(filter._id);
  }
  Database.db.collection(COLLECTION_NAME).find(filter).toArray((err, data) => {
    if (err) return done(err);
    data.forEach((userData, index, users) => {
      users[index] = new User(userData);
    });
    let users = data.length === 1 ? data[0] : data;
    done(null, users);
  });
}

module.exports = {insertUser, updateUser, deleteUser, retrieveUsers};
