'use strict';

const Staff = require('./model');

/**
 * Inserts staff into the database
 * @param {Object} staffData
 * @return {Promise<Staff>} Inserted staff returned if resolved
 * and Error if failed
 */
function insertStaff (staffData) {
  return new Staff(staffData).save();
}
/**
 * Deletes staff from the database
 * @param {Number} id
 * @return {Promise<Staff>} Deleted staff returned if resolved
 * and Error if failed
 */
function deleteStaffById (id) {
  return Staff.findByIdAndRemove(id);
}

/**
 * Set the given data for all staffs matching the filter
 * @param {Object} filter
 * @param {Object} staffData
 * @return {Promise<Staff>} Updated staff returned if resolved
 * and Error if failed
 */
function updateStaff (filter, staffData) {
  return Staff.updateOne(filter, {$set: staffData}, {new: true});
}

/**
 * Set the given data for the staff with the given id
 * @param {Number} id
 * @param {Object} staffData
 * @return {Promise<Staff>} Updated staff returned if resolved
 * and Error if failed
 */
function updateStaffById (id, staffData) {
  return Staff.findByIdAndUpdate(id, {$set: staffData}, {new: true});
}

/**
 * Retrieve all staffs matching the filter
 * @param {Object} filter Filter used to retrieve staffs
 * @return {Promise<Staff[]>} Search result returned if resolved
 * and Error if failed
 */
function retrieveStaffs (filter) {
  return Staff.find(filter);
}

/**
 * Find a specific staff by his/her id
 * @param {Number} id
 * @return {Promise<Staff>} Search result returned if resolved
 * and Error if failed
 */
function findStaffById (id) {
  return Staff.findById(id);
}

/**
 * Find a specific staff by his/her email
 * @param {Number} email
 * @return {Promise<Staff>} Search result returned if resolved
 * and Error if failed
 */
function findStaffByEmail (email) {
  return Staff.findOne({email});
}

module.exports = {
  insertStaff,
  updateStaff,
  updateStaffById,
  deleteStaffById,
  retrieveStaffs,
  findStaffById,
  findStaffByEmail
};
