"use strict";

const express = require('express'),
    router = express.Router();

const pagesHandler = require(appRoot + '/handlers/pages');

router.get('/', pagesHandler.renderIndex);

module.exports = router;