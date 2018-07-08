'use strict';

const express = require('express');
const request = require('request');
const config = require('config');

let router = express.Router();

const API_URL = 'http://' + config.get('api.host') + ':' + config.get('api.port');

router.get('/', (req, res) => {
    let query = req.query.q || '';
    request.get(API_URL + `/staffs?q=${query}`, (err, response, body) => {
        if(err) {
            console.error(err);
            res.send('API is not responding...');
        }
        else{
            res.render('staff/home', {title: 'Staff', staffs: JSON.parse(body)});
        }
    });
});

router.route('/insert')
    .get((req, res) => {
        res.render('staff/insert', {title: 'Insert new Staff'});
    })
    .post((req, res) => {
        request.post(API_URL + '/staffs', {
            form: req.body
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
        request.get(API_URL + '/staffs/' + id, (err, response, body) => {
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
        request.put(API_URL + '/staffs/' + req.body.id,{
                form: req.body
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
    request.delete(API_URL + '/staffs/' + id, (err, response, body) => {
        if(err){
            console.error(err);
            res.sendStatus(404);
        }
        else {
            res.redirect('/staff');
        }
    });
}); 

module.exports = router;