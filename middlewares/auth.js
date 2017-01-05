"use strict";

const noAuth = (req, res, next) => {
    req.isAuthenticated() ? res.redirect('/') : next();
};

const isUser = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/');
};

const isSuperUser = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/');
};

module.exports = {
    noAuth,
    isUser,
    isSuperUser
};