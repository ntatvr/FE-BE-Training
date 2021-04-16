'use strict';
const Joi = require('joi');
const userController =  require('./components/auth/userController');
const userScheme = require('./components/auth/userScheme');

module.exports = [
	{
		method: 'GET',
		path: '/users',
		handler: userController.find
	},
	{
		method: 'GET',
		path: '/token',
		handler: userController.getToken,
		options: {
            auth: 'basic'
        }
	},
	{
		options: {
			validate: {
				payload: userScheme,
				options: {
					abortEarly: false
				},
				failAction : function (request, h, error) {
					const errors = {};
					const details = error.details;

					for (let i = 0; i < details.length; ++i) {
						if (!errors.hasOwnProperty(details[i].path)) {
							errors[details[i].path] = details[i].message;
						}
					}

					return h.response(errors).code(error.output.statusCode).takeover();
				}
			}
		},
		method: 'POST',
		path: '/users',
		handler: userController.save,
		options: {
            auth: {
            	strategy: 'token',
            	scope: 'admin'
            }
        }
	}
];