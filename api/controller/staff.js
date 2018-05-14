'use strict';

const express = require("express");
const Database = require("../lib/database");
const Staff = require("../model/staff");

const COLLECTION_NAME = "staff";

function insertStaff(staffData, done){
    let staff = new Staff(staffData);
    Database.db.collection(COLLECTION_NAME).insertOne(staff.insertFormat, (err, result) => {
        if(err) return done(err);
        done(null, result);
    });
}

function deleteStaff(filter, done){
    Database.db.collection(COLLECTION_NAME).deleteOne(filter, (err, result) => {
        if(err) return done(err);
        done(null, result);
    })
}

function updateStaff(filter, staffData, done){
    Database.db.collection(COLLECTION_NAME).updateOne(filter, {$set: staffData}, (err, output) => {
        if(err) return done(err);
        done(null, output.result);
    });
}

function retrieveStaffs(filter, done){
    Database.db.collection(COLLECTION_NAME).find(filter).toArray((err, data) => {
        if(err) return done(err);
        data.forEach((staffData, index, staffs) => {
            staffs[index] = new Staff(staffData);
        });
        done(null, data);
    });
}

module.exports = {insertStaff, updateStaff, deleteStaff, retrieveStaffs};