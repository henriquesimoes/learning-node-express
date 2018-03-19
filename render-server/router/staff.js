'use strict';

const express = require('express');
const request = require('request');
const config = require('config');

let router = express.Router();

const API_URL = 'http://' + config.get('api.host') + ':' + config.get('api.port');

router.get('/', (req, res) => {
    let query = req.query.q;
    request.get(API_URL + `/staff?q=${query}`, (err, response, body) => {
        if(err) {
            console.error(err);
            res.send('API is not responding...');
        }
        res.render('staff/home', {title: 'Staff', staffs: JSON.parse(body)});
    });
});

router.route('/insert')
    .get((req, res) => {
        res.render('staff/insert', {title: 'Insert new Staff'});
    })
    .post((req, res) => {
        let staff = {
            name: req.body.name,
            salary: req.body.salary,
            phone: req.body.phone,
            email: req.body.email
        };
        request.post(API_URL + '/staff', {
            form: staff
        }, (err, response, body) => {
            if(err){
                console.error(err);
                res.sendStatus(404);
            }
            else{
                res.redirect('/staff');
            }
        });
    });

router.route('/edit/:id')
    .get((req, res) => {
        let id = req.params.id;
        request.get(API_URL + '/staff/' + id, (err, response, body) => {
            if(err){
                console.error(err);
                res.sendStatus(404);
            }
            else {
                res.render('staff/edit', {title: 'Edit contact', staff: JSON.parse(body)});
            }
        });
    })
    .post((req, res) => {
        let staff = {
            _id: req.body.id,
            name: req.body.name,
            phone: req.body.phone,
            salary: parseFloat(req.body.salary),
            email: req.body.email
        };
        request.put(API_URL + '/staff/' + staff._id,{
                form: {
                    id: staff._id,
                    name: staff.name,
                    phone: staff.phone,
                    salary: staff.salary,
                    email: staff.email
                }
            }, (err, response, body) => {
                if(err){
                    console.error(err);
                    res.sendStatus(404);
                }
                else {
                    res.redirect('/staff');
                }
        });
    });

router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    request.delete(API_URL + '/staff/' + id, (err, response, body) => {
        if(err){
            console.error(err);
            res.send(404);
        }
        else {
            res.redirect('/staff');
        }
    });
}); 

module.exports = router;