'use strict';

const Database = require('../lib/database');
/**
 * Class used to verify staff data
 */
class Staff {
  /**
   *
   * @param {Object} staff Data object used to populate Staff object
   */
  constructor (staff) {
    if (staff !== undefined) {
      this.id = staff._id;
      if (staff.id !== undefined) {
        this.id = staff.id;
      }
      this.name = staff.name;
      this.email = staff.email;
      this.phone = staff.phone;
      this.updateSalary(parseFloat(staff.salary));
    }
  }
  /**
   * Returns the staff's data in the insertion format
   */
  get insertFormat () {
    return {
      name: this.name,
      phone: this.phone,
      email: this.email,
      salary: this.salary
    };
  }

  /**
   * Returns the staff's data in the update format
   */
  get updateFormat () {
    let staff = {};
    if (this.name !== undefined) {
      staff.name = this.name;
    }
    if (this.email !== undefined) {
      staff.email = this.email;
    }
    if (this.phone !== undefined) {
      staff.phone = this.phone;
    }
    if (this.salary !== undefined) {
      staff.salary = this.salary;
    }
    return staff;
  }
  /**
   * Returns the staff id as an ObjectID object
   */
  get objectId () {
    return Database.createObjectID(this.id);
  }
  /**
   * Update salary value
   * @param {float} salary New salary value
   */
  updateSalary (salary) {
    this.salary = (salary < 0) ? 0 : salary;
  }
}

module.exports = Staff;
