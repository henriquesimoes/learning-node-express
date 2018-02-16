'use strict';
const express = require('express');
const View = require('../view');

class StaffRouter {
    constructor(){
        this.router = express.Router();
    
        this.router.use((req, res, next) => {
            next();
        });
        
        this.router.get('/', (req, res) => {
            View.render(res, 'staff/index.html', {title: 'Staff'});
        });
        
        this.router.get('/all', (req, res) => {
            this.db.collection('staff').find({}).toArray((err, data) => {
                if(err) throw err;
                var html = '<table border>';
                html += '<tr><th>Name</th><th>Salary</th><th>Action</th></tr>';
                data.forEach(staff => {
                    html += '<tr>';
                    html += `<td>${staff.name}</td>`;
                    html += `<td>${staff.salary}</td>`;
                    html += `<td><a href='http://localhost:8080/staff/delete/${staff._id}'>Delete</a></tr>`;
                });
                html += '</table>';
                res.send(html);
            });
        });

        this.router.route('/insert')
                .get((req, res) => {
                    View.render(res, 'staff/insert.html', {title: 'Add new Staff'});
                })
                .post((req, res) => {
                    this.db.createCollection('staff', (err, db) => {
                        if(err) throw err;
                        db.insertOne({name: req.body.name, salary: parseInt(req.body.salary)}, (err, result) =>{
                            if(err) throw err;
                            res.send(req.body.name + ' inserted!');
                        });
                    });
                });

        this.router.get('/delete/:id', (req, res) => {
            /*this.db.collection('staff').deleteOne({_id: new database.ObjectId(req.params.id)}, (err, obj) => {
                if(err) throw err;
                console.log(obj);
                res.redirect('../all');
            });*/
        });
    }

    setDatabase(db) {
        if(db === undefined){
            throw new Error('Undefined database');
        }
        this.db = db;
    }
}

module.exports = new StaffRouter();