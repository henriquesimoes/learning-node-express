'use strict';

const Database = require('../lib/database');
/**
 * Class used to verify user data
 */
class User {
  /**
   *
   * @param {Object} user Data object used to populate User object
   */
  constructor (user) {
    if (user !== undefined) {
      this.id = user._id;
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      this.balance = parseFloat(user.balance);
    }
  }

  /**
   * Returns the user's data in the insertion format
   */
  get insertFormat () {
    let user = {};
    if (this.name !== undefined) {
      user.name = this.name;
    }
    if (this.email !== undefined) {
      user.email = this.email;
    }
    if (this.password !== undefined) {
      user.password = this.password;
    }
    if (this.balance !== undefined) {
      user.balance = this.balance;
    }
    return user;
  }

  /**
   * Returns the user's data in the update format
   */
  get updateFormat () {
    let user = {};
    if (this._id !== undefined) {
      user._id = this.objectId;
    }
    if (this.name !== undefined) {
      user.name = this.name;
    }
    if (this.email !== undefined) {
      user.email = this.email;
    }
    if (this.password !== undefined) {
      user.password = this.password;
    }
    if (this.balance !== undefined) {
      user.balance = this.balance;
    }
    return user;
  }
  /**
   * @return {ObjectID} User id
   */
  get objectId () {
    return Database.createObjectID(this.id);
  }
  /**
   *
   * @param {int} id
   * @return {ObjectID}
   */
  static objectId (id) {
    return Database.createObjectID(id);
  }
}

module.exports = User;
