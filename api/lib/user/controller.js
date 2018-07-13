'use strict';

const User = require('./model');

/**
 * Inserts a new user into the database
 * @param {Object} userData User data to be inserted into database
 * @return {Promise<User>} Inserted user if resolved
 * and Error if failed
 */
function insertUser (userData) {
  return new User(userData).save();
}
/**
 * Deletes user by the given id
 * @param {Number} id
 * @return {Promise<User>} Deleted user if resolved
 * and Error if failed
 */
function deleteUserById (id) {
  return User.findByIdAndRemove(id);
}

/**
 * Updates user by the given id
 * @param {Number} id
 * @param {Object} userData Updated data
 * @return {Promise<User>} Updated user if resolved
 * and Error if failed
 */
async function updateUserById (id, userData) {
  if (userData.password) {
    userData.password = await User.encrypt(userData.password);
  }
  return User.findByIdAndUpdate(id, {$set: userData}, {new: true});
}
/**
 * Retrieves users based on the search filter
 * @param {Object} filter Filter used to select users
 * @return {Promise<User[]>} Search result if resolved
 * and Error if failed
 */
function retrieveUsers (filter) {
  return User.find(filter);
}

/**
 * Find user by the given id
 * @param {Number} id
 * @return {Promise<User>} Search result if resolved
 * and Error if failed
 */
function findUserById (id) {
  return User.findById(id);
}

/**
 * Find user by the given email
 * @param {Number} email
 * @return {Promise<User>} Search result if resolved
 * and Error if failed
 */
function findUserByEmail (email) {
  return User.findOne({email});
}

module.exports = {
  insertUser,
  updateUserById,
  deleteUserById,
  retrieveUsers,
  findUserById,
  findUserByEmail
};
