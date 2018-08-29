const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || keys.OAUTHCREDENTIALS.googleClientID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || keys.OAUTHCREDENTIALS.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({googleId: profile.id}, function (err, user) {
        //     return cb(err, user);
        // });

        console.log("ACCESS TOKEN" + accessToken);
    }
));


app.get('/', function (req, res) {

    res.send("HI THERE");

});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT);