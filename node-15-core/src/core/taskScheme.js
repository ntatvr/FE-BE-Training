'use strict';
const Joi = require('joi');

const taskSchema = Joi.object({
	title: Joi.string().min(10).max(100).required(),
	description: Joi.string().min(10).max(1000).required(),
	//reporter: Joi.string().required(),
	assignee: Joi.string().required(),
	status: Joi.string().valid('Open', 'In-progress', 'Done', 'Closed')
});

module.exports = taskSchema;