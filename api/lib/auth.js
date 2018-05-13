'use strict';

const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const userController = require("../controller/user");

passport.use(new BasicStrategy((email, password, done) => {
    userController.retrieveUsers({email: email}, (err, user) => {
        if(err) return done(err);
        if(user === undefined) return done(null, false);
        if(user.password !== password) return done(null, false);
        return done(null, user);
    });
}));

module.exports = passport;