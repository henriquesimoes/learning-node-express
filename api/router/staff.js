'use strict';
const express = require('express');
const Database = require('../lib/database');
const config = require("config");
const Staff = require("../model/staff");
const controller = require("../controller/staff");

let router = express.Router();

router.route('/')
    .get((req, res) => {
        controller.retrieveStaffs({name: new RegExp(req.query.q, "ig")}, (err, staffs) => {
            if(err) throw err;
            res.json(staffs);
        });
    })
    .post((req, res) => {
        controller.insertStaff(req.body, (err, result) => {
            if(err) throw err;
            res.json(result);
        })
    })

router.route('/:id')
    .get((req, res) => {
        let staff = new Staff(req.params);
        controller.retrieveStaffs({_id: staff.objectId}, (err, staff) => {
            if(err) throw err;
            if(staff.length === 0){
                res.json({message: 'not found'})
            }
            else {
                res.json(staff[0]);
            }
        });
    })
    .delete((req, res) => {
        let staff = new Staff(req.params);
        controller.deleteStaff({_id: staff.objectId}, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    })
    .put((req, res) => {
        let staff = new Staff(req.body);
        controller.updateStaff({_id: staff.objectId}, staff.updateFormat,
            (err, result) => {
                if(err) throw err;
                res.json(result);
            }
        );
    });

module.exports = router;