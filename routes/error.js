"use strict";

const express = require('express');
const router = express.Router();

router.use( (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	
	if (err.stack) console.log(err.stack);
	
	res.status(err.statusCode).send(err);
});

module.exports = router;