const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
// passport.use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://www.example.com/auth/google/callback"
//     },
//     function (accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({googleId: profile.id}, function (err, user) {
//             return cb(err, user);
//         });
//
//     }
// ));


app.get('/', function (req, res) {

    res.send("HI THERE");

});

app.get('/auth/google', function (req, res) {


});

const PORT = process.env.PORT || 5000;
app.listen(PORT);