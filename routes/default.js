"use strict";

const express = require('express'),
    router = express.Router(),
    config = require(appRoot + '/config'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('express-flash');

const authHandler = require(appRoot + '/handlers/auth');

router.use( flash() );
router.use( bodyParser.json() );
router.use( bodyParser.urlencoded({ extended: false }) );
router.use( cookieParser() );

router.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: true,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;
passport.use( new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, authHandler.login) );

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

const auth = passport.authenticate(
    'local', {
        successRedirect: '/',
        failureRedirect: '/login',
        'failureFlash': true
    }
);

router.post('/login', auth);
router.get('/logout', (req, res) => {
    var returnTo = req.headers['referer'];

    req.logout();
    req.session.destroy(function (err) {
        if (err) return next(err);

        return redir(res, returnTo);
    });

    function redir(res, returnTo) {
        if (returnTo) {
            return res.redirect(returnTo);
        } else {
            return res.send('bye');
        }
    }
});

router.post('/registration', authHandler.registration, auth);

module.exports = router;