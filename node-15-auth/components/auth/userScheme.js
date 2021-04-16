'use strict';
const Joi = require('joi');

const userSchema = Joi.object({
	username: Joi.string().alphanum().min(6).max(30).required(),
	password: Joi.string().alphanum().min(6).max(30).required(),
	scope: Joi.array().min(1)
});

module.exports = userSchema;