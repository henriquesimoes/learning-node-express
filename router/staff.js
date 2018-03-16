'use strict';
const express = require('express');
const Database = require('../lib/database');
const config = require("config");

class StaffRouter {
    constructor(){
        this.router = express.Router();
        if(config.get("response.return") === "json"){
            this.json = true;
        }
        
        this.router.get('/', (req, res) => {
            Database.db.collection('staff').find({name: new RegExp(req.query.q, "ig")}).toArray((err, data) => {
                if(err) throw err;
                this.render(res, 'staff/home', {title: 'Staffs', staffs: data});
            });
        });

        this.router.route('/insert')
                .get((req, res) => {
                    this.render(res, 'staff/insert', {title: 'Add new Staff'});
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
                            res.redirect('../staff');
                        });
                    });
                });

        this.router.get('/delete/:id', (req, res) => {
            Database.db.collection('staff').deleteOne({_id: Database.createObjectID(req.params.id)}, (err, obj) => {
                if(err) throw err;
                res.redirect('..');
            });
        });

        this.router.route('/edit/:id')
            .get((req, res) => {
                Database.db.collection('staff').find(
                    {_id: Database.createObjectID(req.params.id)}
                ).toArray((err, data) => {
                    this.render(res, 'staff/edit', {title: 'Edit', staff: data[0]});
                })
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
                        res.redirect('../');
                    }
                );
            });
    }
    render(res, file, data){
        if(this.json){
            res.json(data);
        }
        else{
            res.render(file, data);
        }
    }
}

module.exports = new StaffRouter();