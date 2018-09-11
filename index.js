const express = require('express');
const mongoose = require('mongoose');
const cookie = require('cookie-session');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');
const authRoute = require('./routes/authRoutes');
const billingRoute = require('./routes/billingRoutes');

mongoose.connect(keys.OAUTHCREDENTIALS.mongoURI);
console.log("Mongoose State: "+ mongoose.connection.readyState);

const app = express();
app.use(bodyParser.json());

app.use(
    cookie({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.OAUTHCREDENTIALS.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoute(app);
billingRoute(app);

if (process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    // like our main.js, or main.css
    app.use(express.static('client/build'));

    // Express will serve up index.html if it does not recognize the route
    const path = require('path');
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT);