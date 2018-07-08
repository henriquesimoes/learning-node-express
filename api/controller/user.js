'use strict';

const User = require('../model/user');

/**
 * Inserts a new user into the database
 * @param {Object} userData User data to be inserted into database
 * @return {User}
 */
async function insertUser (userData) {
  const user = new User(userData);
  await user.save();
  return user;
}
/**
 * Deletes user by the given id
 * @param {Number} id
 * @return {User} Deleted user
 */
function deleteUserById (id) {
  return User.findByIdAndRemove(id);
}

/**
 * Updates user by the given id
 * @param {Number} id
 * @param {Object} userData Updated data
 * @return {User} Updated user
 */
function updateUserById (id, userData) {
  return User.findByIdAndUpdate(id, userData, {new: true});
}
/**
 * Retrieves users based on the search filter
 * @param {Object} filter Filter used to select users
 * @return {User[]} Search result
 */
function retrieveUsers (filter) {
  return User.find(filter);
}
/**
 * Find user by the given id
 * @param {Number} id
 * @return {User} Search result
 */
function findUserById (id) {
  return User.findById(id);
}

module.exports = {
  insertUser,
  updateUserById,
  deleteUserById,
  retrieveUsers,
  findUserById
};
