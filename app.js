"use strict";

const express = require('express'),
	path = require('path'),
	config = require('./config'),
	router = require('./routes'),
	morgan = require('morgan'),
	jade = require('jade');
	
global._ = require('lodash');
global.appRoot = path.resolve(__dirname);

const init = require('./init');
let app = express();

app.set('port', config.get('port'));
app.use('/public', express.static('public'));
app.set('views', __dirname + "/static");

app.use('/static', express.static(__dirname + '/static'));
app.set('view options', {layout:false} );
app.set('view engine', 'jade');

//app.use(morgan('combined'));

init()
	.then( () => {
		router(app);
	})
	.catch( err => {
		console.log(err.stack);
		
	});

module.exports = app;