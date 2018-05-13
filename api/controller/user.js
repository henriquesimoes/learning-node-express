'use strict';

const express = require("express");
const Database = require("../lib/database");
const User = require("../model/user");

const COLLECTION_NAME = "user";

function insertUser(userData, done){
    Database.db.collection(COLLECTION_NAME, (err, db) => {
        if(err) done(err);
        let user = new User(userData);
        db.insertOne(user.insertFormat, (err, result) => {
            if(err) done(err);
            done(null, result);
        });
    });
}

function deleteUser(filter, done){
    Database.db.collection(COLLECTION_NAME, (err, db) => {
        if(err) done(err);
        db.deleteOne(filter, (err, result) => {
            if(err) done(err);
            done(null, result);
        });
    });
}

function updateUser(filter, userData, done){
    Database.db.collection(COLLECTION_NAME, (err, db) => {
        if(err) done(err);
        let user = new User(userData);
        db.updateOne(filter, user.updateFormat, (err, result) => {
            if(err) done(err);
            done(null, result);
        });
    });
}

function retrieveUsers(filter, done){
    Database.db.collection(COLLECTION_NAME, (err, db) => {
        if(err) done(err);
        db.find(filter).toArray((err, data) => {
            if(err) done(err);
            data.forEach((userData, index, users) => {
                users[index] = new User(userData);
            });
            let users = data.length === 1? data[0] : data;
            done(null, users);
        });
    });
}

module.exports = {insertUser, updateUser, deleteUser, retrieveUsers};