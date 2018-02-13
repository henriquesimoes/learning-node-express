'use strict';
const express = require('express');

class Staff {
    constructor(name, salary){
        this.name = name;
        this.salary = salary;
    }
    
    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }
    getSalary(){
        return this.salary;
    }
    setSalary(salary){
        this.salary = salary;
    }
}

class StaffRouter {
    constructor(){
        this.router = express.Router();
    
        this.router.use((req, res, next) => {
            console.log(Date.now() + ' db=' + this.db.databaseName);
            next();
        });
        
        this.router.get('/', (req, res) => {
            var html = '<form method="get" action="insert">';
            html += 'Name: <input name="name"/><br/>';
            html += 'Salary: <input name="salary"/><br/>';
            html += '<input type="submit"/>';
            html += '</form>';
            res.send(html);
        });
        
        this.router.get('/all', (req, res) => {
            this.db.collection('staff').find({}).toArray().then((data) => {
                res.json(data);
            });
        });

        this.router.get('/insert', (req, res) => {
            this.db.createCollection('staff', (err, db) => {
                if(err) throw err;
                db.insertOne(req.query, (err, db) =>{
                    if(err) throw err;
                    res.send(req.query.name + ' inserted!');
                });
            });
        });
    }

    setDatabase(db) {
        this.db = db;
    }
}

module.exports = new StaffRouter();