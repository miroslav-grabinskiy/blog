"use strict";

const util = require('util');
const userModel = require(appRoot + '/models/user');
const libs = require(appRoot + '/libs/custom');
const render = require(appRoot + '/core/render');

const registration = (req, res, next) => {
    const login = req.body.login,
        password = req.body.password;

    userModel.checkExistUserByLogin(login)
        .then(isExist => {
            if (isExist) {
                return Promise.resolve(false);
            }
            
            return userModel.createUser(login, password);
        })
        .then(user => {
            if (!user) {
                return next([400, 'user already exist']);
            }

            next();
        })
        .catch(err => next(err))
};

const login = (login, password, done) => {
    userModel.getUserByLoginAndCheckPassword(login, password)
        .then(user => {
            console.log(user);
            if (user) {
                done(null, {id: user._id, login: user.login, role: user.role})
            } else {
                done(null, false, {message: 'bad login or password'});
            }
        })
        .catch(err => done(err))
};

const renderLogin = (req, res, next) => {
    render.renderPage(res, {
        render: 'site/partials/login.jade',
        context: {
            message: libs.getErrorMessage(req.flash('error'))
        },
        title: 'login',
        description: 'login existed user',
        currentPage: 'login',
        type: 1,
        auth: false
    });
};

const renderRegistration = (req, res, next) => {
    render.renderPage(res, {
        render: 'site/partials/registration.jade',
        context: {
            message: libs.getErrorMessage(req.flash('error'))
        },
        title: 'registration',
        description: 'register new account',
        currentPage: 'registration',
        type: 1,
        auth: false
    });
};

module.exports = {
    registration,
    login,
    renderLogin,
    renderRegistration
};