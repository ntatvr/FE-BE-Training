const User =  require('../model/user');
const Security =  require('../security');
const Joi = require('joi');
const Boom = require('@hapi/boom');

async function findOne(request, h) {
	var user = await User.findById(request.params.id);
	if (!user) return {message: 'User not found!'};
	return user;
}

exports.find = async (request, h) => {
	console.log('Get All Users');
	return User.find({}).catch(e => {
		console.log('Error: ', e.message);
		throw Boom.badRequest(e.message);
	});;
}

exports.findOne = async (request, h) => {
	return findOne(request, h).catch(e => {
		console.log('Error: ', e.message);
		throw Boom.badRequest(e.message);
	});
}

exports.save = async (request, h) => {

	var userData = new User();
	if (request.params.id) {
		userData = await findOne(request, h);
	}

	userData.username = request.payload.username;
	userData.password = await Security.encrypt(request.payload.password);
	userData.roles = request.payload.roles;
	console.log(userData);

	await userData.save().catch(e => {
		console.log('Error: ', e.message);
		throw Boom.badRequest(e.message);
	});
	return { message: "User is updated successfully", user: userData };
}

exports.delete = async (request, h) => {
	await (await findOne(request, h)).deleteOne();
	return {success: true};
}