'use strict';

const express = require("express");
const Database = require("../lib/database");
const User = require("../model/user");

const COLLECTION_NAME = "user";

function insertUser(userData, done){
    let user = new User(userData);
    Database.db.collection(COLLECTION_NAME).insertOne(user.insertFormat, (err, result) => {
        if(err) return done(err);
        done(null, result);
    });
}

function deleteUser(filter, done){
    Database.db.collection(COLLECTION_NAME).deleteOne(filter, (err, result) => {
        if(err) return done(err);
        done(null, result);
    });
}

function updateUser(filter, userData, done){
    let user = new User(userData);
    Database.db.collection(COLLECTION_NAME).updateOne(filter, {$set: user.updateFormat}, (err, result) => {
        if(err) return done(err);
        done(null, result);
    });
}

function retrieveUsers(filter, done){
    Database.db.collection(COLLECTION_NAME).find(filter).toArray((err, data) => {
        if(err) return done(err);
        data.forEach((userData, index, users) => {
            users[index] = new User(userData);
        });
        let users = data.length === 1? data[0] : data;
        done(null, users);
    });
}

module.exports = {insertUser, updateUser, deleteUser, retrieveUsers};