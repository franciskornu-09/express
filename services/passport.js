const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || keys.OAUTHCREDENTIALS.googleClientID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || keys.OAUTHCREDENTIALS.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {

        User.findOne({googleId: profile.id})
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    new User({googleId: profile.id, credits:0}).save().then(function (user) {
                        return done(null, user);
                    });
                }
            });

        // User.findOrCreate({googleId: profile.id}, function (err, user) {
        //     return cb(err, user);
        // });

    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});