'use strict';

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const {controller} = require('./user');

passport.use(new BasicStrategy(async (email, password, done) => {
  const user = await controller.retrieveUsers({email});
  if (!user) return done(null, false);
  if (user.password !== password) return done(null, false);
  return done(null, user);
}));

module.exports = passport;
