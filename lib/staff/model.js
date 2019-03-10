'use strict';

const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  phone: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Staff', staffSchema);
