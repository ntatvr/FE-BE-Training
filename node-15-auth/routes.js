'use strict';
const Joi = require('joi');
const userController =  require('./src/auth/userController');
const userScheme = require('./src/auth/userScheme');

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
            auth: 'basic',
            description: 'Get Token',
	        notes: 'Returns a token',
	        tags: ['api'],
        }
	},
	{
		method: 'GET',
		path: '/users',
		handler: userController.find,
		options: {
            auth: {
				mode: 'required',
            	strategy: 'token',
            	scope: ['+admin']
            },
            description: 'Get all users',
	        notes: 'Returns all users',
	        tags: ['api'],
        }
	},
	{
		method: 'GET',
		path: '/users/{id}',
		handler: userController.findById,
		options: {
            auth: {
				mode: 'required',
            	strategy: 'token',
            	scope: ['admin', 'user']
            },
            description: 'Get user by id',
	        notes: 'Returns the user',
	        tags: ['api'],
        }
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