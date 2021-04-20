'use strict';
const Joi = require('joi');
const UserController =  require('./controller/user');

module.exports = [
	{
		method: 'GET',
		path: '/users',
		handler: function(request, h) {
        	return h.view('user', {
        		title: request.server.settings.app.title
        	});
        }
	},
	{
		options: {
			validate: {
				payload: Joi.object({
					username: Joi.string().alphanum().min(6).max(30).required(),
					password: Joi.string().alphanum().min(6).max(30).required(),
					roles: Joi.array().min(0)
				}),
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

					return h.view('user', {
						errors: errors,
						values: request.payload
					}).code(error.output.statusCode).takeover();
				}
			}
		},
		method: 'POST',
		path: '/users',
		handler: function(request, h) {

        	return h.view('user');
        }
	},
	/* Users APIs */
	{
		method: 'GET',
		path: '/v1/users',
		handler: UserController.find,
		options: {
            cache: {
                expiresIn: 30 * 1000,
                privacy: 'private'
            }
        }
	},
	{
		method: 'GET',
		path: '/v1/users/{id}',
		handler: UserController.findOne
	},
	{
		options: {
			validate: {
				payload: Joi.object({
					username: Joi.string().alphanum().min(6).max(30).required(),
					password: Joi.string().alphanum().min(6).max(30).required(),
					roles: Joi.array().min(0)
				})
			}
		},
		method: 'POST',
		path: '/v1/users',
		handler: UserController.save
	},
	{
		method: 'PUT',
		path: '/v1/users/{id}',
		handler: UserController.save
	},
	{
		method: 'DELETE',
		path: '/v1/users/{id}',
		handler: UserController.delete
	},
];