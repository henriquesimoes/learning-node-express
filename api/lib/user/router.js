'use strict';
const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.route('/:id')
  .get(async (req, res) => {
    const user = await controller.findUserById(req.params.id);
    if (!user) return res.status(404).send();
    res.json(user);
  })
  .put(async (req, res) => {
    const user = await controller.updateUserById(req.params.id, req.body);
    if (!user) return res.status(404).send();
    res.json(user);
  })
  .delete(async (req, res) => {
    const user = await controller.deleteUserById(req.params.id);
    if (!user) return res.status(404).send();
    res.json(user);
  });

router.route('/')
  .get(async (req, res) => {
    const user = await controller.retrieveUsers({});
    if (!user) return res.status(404).send();
    res.json(user);
  })
  .post(async (req, res) => {
    const user = await controller.insertUser(req.body);
    if (!user) return res.status(404).send();
    res.json(user);
  });

module.exports = router;
