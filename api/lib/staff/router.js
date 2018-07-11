'use strict';
const express = require('express');
const controller = require('./controller');
const validate = require('../middleware/validate');
const validator = require('./validator');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const staffs = await controller.retrieveStaffs({
      name: new RegExp(req.query.q, 'ig')
    });
    if (!staffs) return res.status(404).send();
    res.json(staffs);
  })
  .post(validate(validator.newStaff), async (req, res) => {
    const staff = await controller.insertStaff(req.body);
    if (!staff) return res.status(404).send();
    res.json(staff);
  });

router.route('/:id')
  .get(async (req, res) => {
    const staff = await controller.findStaffById(req.params.id);
    if (!staff) return res.status(404).send();
    res.json(staff);
  })
  .delete(async (req, res) => {
    const staff = await controller.deleteStaffById(req.params.id);
    if (!staff) return res.status(404).send();
    res.json(staff);
  })
  .put(validate(validator.update), async (req, res) => {
    const staff = await controller.updateStaffById(req.params.id, req.body);
    if (!staff) return res.status(404).send();
    res.json(staff);
  });

module.exports = router;
