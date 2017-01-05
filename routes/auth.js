"use strict";


const express = require('express'),
    router = express.Router(),
    noAuth = require(appRoot + '/middlewares/auth').noAuth;

const authHandler = require(appRoot + '/handlers/auth');

router.get('/login', noAuth, authHandler.renderLogin);
router.get('/registration', noAuth, authHandler.renderRegistration);


module.exports = router;