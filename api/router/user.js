'use strict';
const express = require('express');
const controller = require('../controller/user');

const router = express.Router();

router.route('/:id')
  .get((req, res) => {
    controller.retrieveUsers({_id: req.params.id}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  })
  .put((req, res) => {
    controller.updateUser({_id: req.params.id}, req.body, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  })
  .delete((req, res) => {
    controller.deleteUser({_id: req.params.id}, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

router.route('/')
  .get((req, res) => {
    controller.retrieveUsers({}, (err, users) => {
      if (err) throw err;
      res.json(users);
    });
  })
  .post((req, res) => {
    controller.insertUser(req.body, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

module.exports = router;
