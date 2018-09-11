const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = function(app) {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
        res.redirect('/surveys');
    });

    app.get('/api/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', function (req, res) {
        console.log("CURRENT USER 1 "+ JSON.stringify(req.user));
        res.send(req.user);
    })
};
