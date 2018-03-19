'use strict';
const express = require('express');
const Database = require('../lib/database');
const config = require("config");

class StaffRouter {
    constructor(){
        this.router = express.Router();
        
        this.router.get('/', (req, res) => {
            Database.db.collection('staff').find({name: new RegExp(req.query.q, "ig")}).toArray((err, data) => {
                if(err) throw err;
                res.json(data);
            });
        });

        this.router.post('/insert', (req, res) => {
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
                });

        this.router.get('/delete/:id', (req, res) => {
            Database.db.collection('staff').deleteOne({_id: Database.createObjectID(req.params.id)}, (err, obj) => {
                if(err) throw err;
                res.json(obj);
            });
        });

        this.router.route('/edit/:id')
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
            .post((req, res) => {
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
    }
}

module.exports = new StaffRouter();