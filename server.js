'use strict';

const express = require('express');
const config = require('config');
const app = express();

const staff = require('./router/staff');
const database = require('./lib/database');

const PORT = config.get('server.port');
const HOST = config.get('server.host');
const DATABASE = config.get('db.name');

database.connectToDatabase(DATABASE, (err) => {
    if(err) throw err;
    console.log('Database "' + database.db.databaseName + '" is up...'); 
});

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.all('/', (req, res) => {
    res.render('home/home', {title: 'Homepage'});
});

app.use('/staff', staff.router);

app.listen(PORT, HOST, (err) => {
    if(err) throw err;
    console.log(`Running on http//${HOST}:${PORT}`);
});

module.exports = app;