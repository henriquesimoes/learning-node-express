'use strict';
const express = require('express');
const View = require('../lib/view');
const Database = require('../lib/database');

class StaffRouter {
    constructor(){
        this.router = express.Router();
    
        this.router.use((req, res, next) => {
            next();
        });
        
        this.router.get('/', (req, res) => {
            Database.db.collection('staff').find({}).toArray((err, data) => {
                if(err) throw err;
                var table = '<table border>';
                table += '<tr>';
                table += '<th>Name</th><th>Salary</th><th>Phone</th><th>Email</th><th>Action</th>';
                table += '</tr>';
                data.forEach(staff => {
                    table += '<tr>';
                    table += `<td>${staff.name}</td>`;
                    table += `<td>${staff.salary}</td>`;
                    table += `<td>${staff.phone}</td>`;
                    table += `<td>${staff.email}</td>`;
                    table += `<td><a href='http://localhost:8080/staff/delete/${staff._id}'>Delete</a></tr>`;
                });
                table += '</table>';
                View.render(res, 'staff/index.html', {title: 'Staffs', table: table});
            });
        });

        this.router.route('/insert')
                .get((req, res) => {
                    View.render(res, 'staff/insert.html', {title: 'Add new Staff'});
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
                            let message = req.body.name + ' inserted! ';
                            message += '<a href="http://localhost:8080/staff/">Voltar</a>';
                            res.send(message);
                        });
                    });
                });

        this.router.get('/delete/:id', (req, res) => {
            Database.db.collection('staff').deleteOne({_id: Database.createObjectID(req.params.id)}, (err, obj) => {
                if(err) throw err;
                res.redirect('../');
            });
        });
    }
}

module.exports = new StaffRouter();