'use strict';
const Joi = require('joi');
const taskController =  require('./src/core/taskController');
const {taskRequestSchema, taskResponseSchema, tasksResponseSchema} = require('./src/core/taskScheme');
const authService = require('./src/auth/authService');
const Boom = require('@hapi/boom');

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
		path: '/tasks',
		handler: taskController.find,
		options: {
			validate: {
				query: Joi.object({
			        page: Joi.number().default(1).optional(),
			        size: Joi.number().default(10).optional()
			    }),
	            headers: Joi.object({
	                'authorization': Joi.string().required()
	            }).unknown(),
	            options: {
			        allowUnknown: true
			    },
	            failAction : failAction,
	        },
            auth: {
				mode: 'required',
            	strategy: 'token',
            	scope: ['admin', 'user']
            },
            description: 'Get All Tasks',
	        notes: 'Returns list of tasks',
	        tags: ['api', 'task'],
	        response: {
	        	status: {
	        		200: tasksResponseSchema,
	        		400: Joi.any()
	        	}
	        }
        }
	},
	{
		method: 'GET',
		path: '/tasks/{id}',
		handler: taskController.findById,
		options: {
			validate: {
	            headers: Joi.object({
	                'authorization': Joi.string().required()
	            }).unknown(),
	            failAction : failAction,
	        },
            auth: {
				mode: 'required',
            	strategy: 'token',
            	scope: ['admin', 'user']
            },
            description: 'Get task by id',
	        notes: 'Returns the task',
	        tags: ['api', 'task']
        }
	},
	{	
		options: {
			auth: {
				mode: 'required',
            	strategy: 'token',
            	scope: ['admin', 'user']
            },
			validate: {
				payload: taskRequestSchema,
				options: {
					abortEarly: false
				},
				headers: Joi.object({
	                'authorization': Joi.string().required()
	            }).unknown(),
	            failAction : failAction,
			},
			pre: [
				{ method: taskController.verifyUniqueTitle },
				{ 
					method: async function(request, h) {
						const auth = request.auth;
						const isValidUserId = await authService.isValidUserId(request.payload.assignee, auth.token);
						if (isValidUserId) {
							return h.continue;
						}
						throw Boom.badRequest('Assignee is invalid');
					} 
				}
			],
			description: 'Create/Update Task',
	        notes: 'Create/Update Task',
	        tags: ['api', 'task'],
	        response: {schema: taskResponseSchema}
		},
		method: ['POST', 'PUT'],
		path: '/tasks/{id?}',
		handler: taskController.save
	}
];