'use strict';

const Database = require('../lib/database');
const Staff = require('../model/staff');

const COLLECTION_NAME = 'staff';

/**
 *
 * @param {*} staffData
 * @param {fn} done
 */
function insertStaff (staffData, done) {
  let staff = new Staff(staffData);
  Database.db.collection(COLLECTION_NAME)
    .insertOne(staff.insertFormat, (err, result) => {
      if (err) return done(err);
      done(null, result);
    });
}
/**
 *
 * @param {Object} filter
 * @param {fn} done
 */
function deleteStaff (filter, done) {
  Database.db.collection(COLLECTION_NAME)
    .deleteOne(filter, (err, result) => {
      if (err) return done(err);
      done(null, result);
    });
}

/**
 *
 * @param {Object} filter
 * @param {Object} staffData
 * @param {fn} done
 */
function updateStaff (filter, staffData, done) {
  Database.db.collection(COLLECTION_NAME)
    .updateOne(filter, {$set: staffData}, (err, output) => {
      if (err) return done(err);
      done(null, output.result);
    });
}
/**
 *
 * @param {Object} filter Filter used to retrieve staffs
 * @param {fn} done Callback function
 */
function retrieveStaffs (filter, done) {
  Database.db.collection(COLLECTION_NAME).find(filter).toArray((err, data) => {
    if (err) return done(err);
    data.forEach((staffData, index, staffs) => {
      staffs[index] = new Staff(staffData);
    });
    done(null, data);
  });
}

module.exports = {insertStaff, updateStaff, deleteStaff, retrieveStaffs};
