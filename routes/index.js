"use strict";

const includeRoutes = [
	'default',
	'blog',
	'error',
	'auth',
	'admin',
	'pages'
];

function initRoutes(app) {
	includeRoutes.forEach( (item) => {
		app.use( require('./' + item) );
	});
}

module.exports = initRoutes;