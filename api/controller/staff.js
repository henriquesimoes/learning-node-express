'use strict';

const Staff = require('../model/staff');

/**
 *
 * @param {*} staffData
 */
async function insertStaff (staffData) {
  let staff = new Staff(staffData);
  await staff.save();
  return staff;
}
/**
 *
 * @param {Number} id
 * @return {Staff} Deleted staff
 */
function deleteStaffById (id) {
  return Staff.findByIdAndRemove(id);
}

/**
 *
 * @param {Object} filter
 * @param {Object} staffData
 * @return {Staff} Updated staff
 */
function updateStaff (filter, staffData) {
  return Staff.updateOne(filter, {$set: staffData});
}

/**
 *
 * @param {Number} id
 * @param {Object} staffData
 * @return {Staff} Updated staff
 */
function updateStaffById (id, staffData) {
  return Staff.findByIdAndUpdate(id, {$set: staffData}, {new: true});
}
/**
 *
 * @param {Object} filter Filter used to retrieve staffs
 * @return {Staff} Search result
 */
function retrieveStaffs (filter) {
  return Staff.find(filter);
}

/**
 * Find a specific staff by his/her id
 * @param {Number} id
 * @return {Staff} Search result
 */
function findStaffById (id) {
  return Staff.findById(id);
}

module.exports = {
  insertStaff,
  updateStaff,
  updateStaffById,
  deleteStaffById,
  retrieveStaffs,
  findStaffById
};
