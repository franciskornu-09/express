const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');
const authRoute = require('./routes/authRoutes');

mongoose.connect(keys.OAUTHCREDENTIALS.mongoURI);

const app = express();

app.use(session({secret: "qwert456dfgh4ydfgh46dcvbjijstlgxzghjfh345cvbn"}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user);
});

authRoute(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);