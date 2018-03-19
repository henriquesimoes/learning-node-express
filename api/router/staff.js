'use strict';
const express = require('express');
const Database = require('../lib/database');
const config = require("config");

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
            db.insertOne({
                name: req.body.name, 
                salary: parseInt(req.body.salary),
                phone: req.body.phone,
                email: req.body.email
            }, (err, result) =>{
                if(err) throw err;
                res.json(result);
            });
        });
    })

router.route('/:id')
    .get((req, res) => {
        Database.db.collection('staff').find(
            {_id: Database.createObjectID(req.params.id)}
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
        Database.db.collection('staff').deleteOne({_id: Database.createObjectID(req.params.id)}, (err, obj) => {
            if(err) throw err;
            res.json(obj);
        });
    })
    .put((req, res) => {
        Database.db.collection('staff').updateOne(
            {_id: Database.createObjectID(req.body.id)},
            { $set: {
                name: req.body.name, 
                email: req.body.email, 
                phone: req.body.phone, 
                salary: req.body.salary}
            },
            (err, result) => {
                if(err) throw err;
                res.json(result);
            }
        );
    });

module.exports = router;