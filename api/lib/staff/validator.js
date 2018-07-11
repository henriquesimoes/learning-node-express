'use strict';

let Joi = require('joi');
Joi = Joi.extend(require('joi-phone-number'));
Joi.objectId = require('joi-objectid')(Joi);

const schema = {
  _id: Joi.objectId(),
  name: Joi.string().min(2).max(20),
  email: Joi.string().email(),
  phone: Joi.string().phoneNumber({
    defaultCountry: 'BR',
    format: 'e164'
  }),
  salary: Joi.number()
};

/**
 * Validates the properties for adding a user
 *
 * User must contain:
 * - name
 * - email
 * - phone
 * - salary
 *
 * @param {Object} staff Object with staff properties
 * @return {Object} Validation result
 */
module.exports.newStaff = (staff) => {
  return Joi.validate(staff, {
    name: schema.name.required(),
    email: schema.email.required(),
    phone: schema.phone.required(),
    salary: schema.salary.required()
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
 * @return {Object} Validation result
 */
module.exports.update = (req) => {
  return Joi.validate(req,
    Joi.object().keys({
      name: schema.name,
      email: schema.email,
      phone: schema.phone,
      salary: schema.salary
    }).or(Object.keys(schema)));
};
