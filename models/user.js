"use strict";

const config = require(appRoot + '/config'),
	crypto = require('crypto'),
	superUserRole = config.get('custom:superUserRole'),
	mongoose = require(appRoot + '/libs/mongoose'),
	Schema = mongoose.Schema;

let userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        minlength: 4,
        maxlength: 300
        //validate: [validateEmail, 'Please fill a valid email address']
    },
    hashedPassword: {
        type: String
    },
    salt: {
        type: String
    },
	avatar: {
		type: String
	},
	role: {
		type: Number,
		default: 0
	}
});

userSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {return this._plainPassword; });

userSchema.methods.checkPassword = function(password) {
    password = password.toString();
    return this.encryptPassword(password) === this.hashedPassword && !this.onlySocial;
};

const User = mongoose.model('User', userSchema);

const customMethods = {
	checkExistSuperUser: () => {
		return new Promise( (resolve, reject) => {
			User.findOne({role: superUserRole}, (err, user) => {
				if (err) return reject(err);
				
				return resolve(!!user);
			});
		});
	},
	createSuperUser: (login, password) => {
		return new Promise( (resolve, reject) => {
			const superUser = new User({
				login, 
				password,
				role: superUserRole
			});
			
			superUser.save( (err, res) => {
				if (err) return reject(err);
				
				return resolve(res);
			})
		});
	},
	getUserByLoginAndCheckPassword: (login, password) => {
		return new Promise( (resolve, reject) => {
			User.findOne({login: login}, function(err, user) {
				if (err) return reject(err);

				if (user) {
					if ( user.checkPassword( password.toString() ) ) {
						return resolve(user);
					} else {
						return resolve(false);
					}
				} else {
					return resolve(false);
				}
			});
		});
	},
	checkExistUserByLogin: (login) => {
		return new Promise( (resolve, reject) => {
			User.findOne({login: login}, {_id: true}, function(err, user) {
				if (err) return reject(err);

				return resolve(!!user);
			});
		});
	},
	createUser: (login, password, role = 0) => {
		return new Promise( (resolve, reject) => {
			const user = new User({login, password, role});

			user.save( (err, user) => {
				if (err) return reject(err);

				return resolve(user);
			});
		});
	}
};

module.exports = {
	User
};

_.assign(module.exports, customMethods);

console.log(Object.keys(module.exports));