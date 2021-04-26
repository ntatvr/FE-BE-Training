'use strict';
const Joi = require('joi');
const Boom = require('@hapi/boom');
const authController =  require('./src/auth/authController');
const taskController =  require('./src/core/taskController');

function failAction(request, h, error) {
	const errors = {};
	const details = error.details;

	for (let i = 0; i < details.length; ++i) {
		if (!errors.hasOwnProperty(details[i].path)) {
			errors[details[i].path] = details[i].message;
		}
	}
    return h.view('login', {
        errors: errors,
        values: request.payload
    }).code(error.output.statusCode).takeover();
}

module.exports = [
	{
		method: 'GET',
        path: '/',
        handler: function(request, h) {
            if (request.auth.isAuthenticated) {
                return h.redirect('/tasks');
            }
        	return h.redirect('/login');
        }
    },
	{
		method: 'GET',
        path: '/tasks',
        options: {
            auth: {
                mode: 'required'
            }
        },
        handler: taskController.getTasks
    },
    {
        method: 'POST',
        path: '/tasks',
        options: {
            auth: {
                mode: 'required'
            }
        },
        handler: taskController.createTask
    },
    {
		method: 'GET',
        path: '/login',
        options: {
            auth: {
                mode: 'try'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
        },
        handler: function(request, h) {
            return h.view('login');
        }
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: {
                mode: 'try'
            },
            validate: {
                payload: Joi.object({
                    username: Joi.string().alphanum().min(4).max(30).required(),
                    password: Joi.string().alphanum().min(4).max(30).required(),
                }),
                options: {
                    allowUnknown: true,
                    abortEarly: false
                },
                failAction : failAction,
            }
        },
        handler: authController.login
    },
    {
        method: 'GET',
        path: '/logout',
        handler: authController.logout
    }
];