"use strict";

const config = require(appRoot + '/config'),
	defaultSuperUserLogin = config.get('custom:defaultSuperUserLogin'),
	defaultSuperUserPassword = config.get('custom:defaultSuperUserPassword'),
	userModel = require(appRoot + '/models/user');

const initApp = () => {
	return new Promise( (resolve, reject) => {
		userModel.checkExistSuperUser()
			.then(user => {
				if (!user) {
					return userModel.createSuperUser(defaultSuperUserLogin, defaultSuperUserPassword);
				} else {
					return Promise.resolve();
				}
			})
			.then(() => {
				return resolve(true);
			})
			.catch(err => reject(err));
	});
};

module.exports = initApp;