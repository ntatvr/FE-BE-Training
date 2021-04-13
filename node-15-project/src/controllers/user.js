const User =  require('../models/user');
const Authentication =  require('../auth/authentication');
const Joi = require('joi');
const Boom = require('@hapi/boom');

async function findOne(request, h) {
	var user = await User.findById(request.params.id);
	if (!user) return {message: 'User not found!'};
	return user;
}

exports.find = async (request, h) => {
	return User.find({});
}

exports.findOne = async (request, h) => {
	return findOne(request, h);
}

exports.save = async (request, h) => {
	// validate

	const schema = Joi.object({
		username: Joi.string().alphanum().min(6).max(30).required(),
	});

	const result = schema.validate({ username: request.payload.username});
	console.log(result);

	var userData = new User();
	if (request.params.id) {
		userData = await findOne(request, h);
	}
	userData.username = request.payload.username;
	userData.password = await Authentication.encrypt(request.payload.password);
	console.log(userData);
	await userData.save().catch(e => {
		console.log('Error: ', e.message);
		throw Boom.badRequest(e.message);
	});;
	return { message: "User is updated successfully", user: userData };
}

exports.delete = async (request, h) => {
	await (await findOne(request, h)).deleteOne();
	return {success: true};
}