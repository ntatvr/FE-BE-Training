const userService =  require('./userService');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');

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
	console.log('Start to save user');
	const user = await userService.save(request.params.id, request.payload);
	return { message: "User is saved successfully.", user: user };
}

exports.delete = async (request, h) => {
	return await userService.delete(request.params.id);
}