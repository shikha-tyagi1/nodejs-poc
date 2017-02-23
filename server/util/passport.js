'use strict';

var config = require('config');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// Passport session setup.
//   For persistent logins with sessions, Passport needs to serialize users into
//   and deserialize users out of the session. Typically, this is as simple as
//   storing the user ID when serializing, and finding the user by ID when
//   deserializing.
passport.serializeUser(function(user, done) {
    console.log("serializeUser ",user);
    // done(null, user.id);
    done(null, user);
});


// Deserialize the user object based on a pre-serialized token
// which is the user id
passport.deserializeUser(function(obj, done) {
    console.log("deserializeUser ",obj);
    // UserModel.findOne({
    //     _id: id
    // }, done);
    done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
//   See http://passportjs.org/docs/configure#verify-callback
passport.use(new GoogleStrategy(
    config.googleStrategy,
    function(accessToken, refreshToken, profile, done) {
        // Here we need to  do validation via DB
        console.log("profile GoogleStrategy===", profile);
        return done(null, profile);
    }
));



// Use Facebook strategy
passport.use(new FacebookStrategy(
    config.facebookStrategy,
    function(accessToken, refreshToken, profile, done) {

       // Here we need to  do validation via DB
       console.log("profile FacebookStrategy===", profile);
       return done(null, profile);
    }
));

module.exports = passport;
