const userService =  require('./userService');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');
const Boom = require('@hapi/boom');

exports.getToken = async (request, h) => {
	return h.response({
		token: jwt.sign(request.auth.credentials, secret, { algorithm: 'HS256'} )
	}).code(200);
}

exports.find = async (request, h) => {
	return await userService.find();
}

exports.findById = async (request, h) => {
	return await userService.findById(request.params.id);
}

exports.save = async (request, h) => {
	const user = await userService.save(request.params.id, request.payload);
	return { message: "User is saved successfully.", user: user };
}

exports.delete = async (request, h) => {
	return await userService.delete(request.params.id);
}

exports.verifyUniqueUser = async (request, h) => {
	const user = await userService.findByUsername(request.payload.username);
	if (user) {
		throw Boom.badRequest('Username is duplicated');
	}

	return h.continue;
}