'use strict';
const express = require('express');
const Database = require('../lib/database');
const config = require("config");
const Staff = require("../model/staff");

let router = express.Router();

router.route('/')
    .get((req, res) => {
        Database.db.collection('staff').find({name: new RegExp(req.query.q, "ig")}).toArray((err, data) => {
            if(err) throw err;
            res.json(data);
        });
    })
    .post((req, res) => {
        Database.db.createCollection('staff', (err, db) => {
            if(err) throw err;
            let staff = new Staff(req.body);
            db.insertOne(staff.insertFormat, (err, result) =>{
                if(err) throw err;
                res.json(result);
            });
        });
    })

router.route('/:id')
    .get((req, res) => {
        let staff = new Staff(req.params);
        Database.db.collection('staff').find(
            {_id: staff.objectId}
        ).toArray((err, data) => {
            if(err) throw err;
            if(data.length == 0){
                res.json({message: 'not found'})
            }
            else {
                res.json(data[0]);
            }
        });
    })
    .delete((req, res) => {
        let staff = new Staff(req.params);
        Database.db.collection('staff').deleteOne({_id: staff.objectId}, (err, obj) => {
            if(err) throw err;
            res.json(obj);
        });
    })
    .put((req, res) => {
        let staff = new Staff(req.body);
        Database.db.collection('staff').updateOne(
            {_id: staff.objectId},
            { $set: staff.updateFormat},
            (err, result) => {
                if(err) throw err;
                res.json(result);
            }
        );
    });

module.exports = router;