'use strict';

const Database = require("../lib/database");

class User {
    constructor(user) {
        if(user !== undefined){
            this._id = user._id;
            this.name = user.name;
            this.email = user.email;
            this.password = user.password;
            this.balance = user.balance;
        }
    }

    get insertFormat(){
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            balance: this.balance
        }
    }

    get updateFormat(){
        let user = {};
        if(this._id !== undefined){
            user._id = this.objectId;
        }
        if(this.name !== undefined){
            user.name = this.name;
        }
        if(this.email !== undefined){
            user.email = this.email;
        }
        if(this.password !== undefined){
            user.password = this.password;
        }
        if(this.balance !== undefined){
            user.balance = this.balance;
        }
        return user;
    }

    get objectId(){
        return Database.createObjectID(this.id);
    }
}

module.exports = User;