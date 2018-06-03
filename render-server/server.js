'use strict';

const express = require('express');
const app = express();
const staff = require('./router/staff');
const HOST = '0.0.0.0';
const PORT = process.env.PORT || 80;

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