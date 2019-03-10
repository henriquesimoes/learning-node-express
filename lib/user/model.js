'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

/**
 * Encrypts the user password
 * @return {string} Encrypted password
 */
userSchema.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return this.password;
};

/**
 * Encrypts using bcrypt
 * @param {string} value Value to be encrypted
 * @return {Promise<string>} Hashed value
 */
userSchema.statics.encrypt = (value) => {
  return bcrypt.hash(value, 10);
};

/**
 * @this {User}
 */
async function saveEncryptedPassword () {
  await this.encryptPassword();
}

userSchema.pre('save', saveEncryptedPassword);

module.exports = mongoose.model('User', userSchema);
