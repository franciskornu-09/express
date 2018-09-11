const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const stripe = require("stripe")(keys.OAUTHCREDENTIALS.stripPrivateKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = function (app) {

    app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id, // obtained with Stripe.js
            description: "Charge for Emaily"
        });

        User.findOne({googleId: req.user.googleId}).then(function (user) {
            user.account += 5;
            user.save().then(function (user) {
                res.send(user);
            })
        });

        // req.user.account += 5;
        //
        // console.log("CHARGED " + JSON.stringify(charge) + " USER " + JSON.stringify(req.user));
        // const user = await {googleId:"112600719929515801450",displayName:"Francis Kornu",account:5}.save();
        //
        // res.send(user);

    })
};