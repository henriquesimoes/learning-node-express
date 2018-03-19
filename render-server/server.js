'use strict';

const express = require('express');
const app = express();
const staff = require('./router/staff');
const HOST = 'localhost';
const PORT = '8080';

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/staff', staff)

app.get('/', (req, res) => {
    res.render('home/home');
});

app.listen(PORT, HOST, (err) => {
    if(err) 
        console.error(err);
    else
        console.log(`Running on http://${HOST}:${PORT}`);
});