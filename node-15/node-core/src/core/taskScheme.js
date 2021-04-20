'use strict';
const Joi = require('joi');

const taskRequestSchema = Joi.object({
	title: Joi.string().min(10).max(100).required(),
	description: Joi.string().min(10).max(1000).required(),
	//reporter: Joi.string().required(),
	assignee: Joi.string().required(),
	status: Joi.string().valid('Open', 'In-progress', 'Done', 'Closed')
});

const taskResponseSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string(),
	reporter: Joi.string(),
	assignee: Joi.string(),
	status: Joi.string()
}).unknown();

const tasksResponseSchema = Joi.object({
	data: Joi.array().items(taskResponseSchema),
	total: Joi.number(),
	page: Joi.number(),
	size: Joi.number(),
	hasMore: Joi.boolean()
}).unknown();

module.exports = {
	taskRequestSchema,
	taskResponseSchema,
	tasksResponseSchema
};