'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
var staff = require('./router/staff');

const MONGO_URL = "mongodb://localhost:27017/";

const PORT = 8080;
const HOST = "localhost";

MongoClient.connect(MONGO_URL, (err, db) => {
    if(err) err;
    var dbo = db.db("mydb");
    staff.setDatabase(dbo);
    console.log('Database is up...');
});

app.all('/', (req, res) => {
    res.send('Everything okay!');
});

app.use('/staff', staff.router);

app.listen(PORT, HOST, (err) => {
    if(err) throw err;
    console.log(`Running on http//${HOST}:${PORT}`);
});