'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schema = {
  _id: Joi.objectId(),
  name: Joi.string().min(2).max(20),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  balance: Joi.number()
};

/**
 * Validates properties for adding a user
 *
 * User must contain:
 * - name
 * - email
 * - password
 *
 * @param {Object} user Object with user properties
 * @param {String} user.name User name
 * @param {String} user.email User's email
 * @param {String} user.password User's password
 * @return {Object} Validation result
 */
module.exports.newUser = (user) => {
  return Joi.validate(user, {
    name: schema.name.required(),
    email: schema.email.required(),
    password: schema.password.required(),
    balance: schema.balance
  });
};

/**
 * Validates the update request object
 *
 * The request must contain one of the following properties:
 * - name
 * - email
 * - password
 *
 * @param {Object} req Request object for updating user
 * @param {String} req.name User name
 * @param {String} req.email User's email
 * @param {String} req.password User's password
 * @param {number} req.balance User's balance
 * @return {Object} Validation result
 */
module.exports.update = (req) => {
  return Joi.validate(req,
    Joi.object().keys({
      name: schema.name,
      email: schema.email,
      password: schema.password,
      balance: schema.balance
    }).or(Object.keys(schema)));
};
