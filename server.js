'use strict';

const express = require('express');
const app = express();

const PORT = 8080;
const HOST = "localhost";

app.all('/', (req, res) => {
    res.send('<p>It´s working just fine!</p>');
});

app.listen(PORT, HOST, (err) => {
    if(err) throw err;
    console.log(`Running on http//${HOST}:${PORT}`);
});