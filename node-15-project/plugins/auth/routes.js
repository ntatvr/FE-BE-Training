'use strict';
const Joi = require('joi');

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
					password: Joi.string().alphanum().min(6).max(30).required()
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
];