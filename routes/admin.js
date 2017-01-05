"use strict";

const express = require('express'),
     router = express.Router();

const auth = require(appRoot + '/middlewares/auth'),
    adminHandler = require(appRoot + '/handlers/admin');

router.get('/admin', auth.isUser, adminHandler.renderAdminIndexPage);

router.get('/admin/pages', auth.isUser, adminHandler.renderAdminPagesPage);

router.get('/admin/categories', auth.isUser, adminHandler.renderAdminCategoriesPage);

module.exports = router;