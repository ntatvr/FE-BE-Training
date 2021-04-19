'use strict';
const Joi = require('joi');
const userController =  require('./components/auth/userController');
const userScheme = require('./components/auth/userScheme');

function failAction(request, h, error) {
	const errors = {};
	const details = error.details;

	for (let i = 0; i < details.length; ++i) {
		if (!errors.hasOwnProperty(details[i].path)) {
			errors[details[i].path] = details[i].message;
		}
	}

	return h.response({errors: errors}).code(error.output.statusCode).takeover();
}

module.exports = [
	{
		method: 'GET',
		path: '/token',
		handler: userController.getToken,
		options: {
            auth: 'basic'
        }
	},
	{
		method: 'GET',
		path: '/users',
		handler: userController.find
	},
	{
		method: 'GET',
		path: '/users/{id}',
		handler: userController.findById
	},
	{	
		options: {
			auth: {
				mode: 'required',
            	strategy: 'token',
            	scope: ['+admin']
            },
			validate: {
				payload: userScheme,
				options: {
					abortEarly: false
				},
				failAction : failAction
			},
			pre: [
				{ method: userController.verifyUniqueUser }
			]
		},
		method: ['POST', 'PUT'],
		path: '/users/{id?}',
		handler: userController.save
	}
];