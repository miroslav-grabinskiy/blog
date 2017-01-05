"use strict";

const express = require('express'),
	router = express.Router();

const blogHandler = require(appRoot + '/handlers/blog');

router.get('/blog', (req, res, next) => {
	res.status(200).send('Hello');
});

router.post('/blog/category', auth.isUser, blogHandler.addCategory);

router.post('/blog/page', auth.isUser, blogHandler.addPage);

module.exports = router;