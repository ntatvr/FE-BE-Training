const taskService =  require('./taskService');
const Boom = require('@hapi/boom');

exports.find = async (request, h) => {
	const tasks = await taskService.find();
	return {tasks: tasks};
}

exports.findById = async (request, h) => {
	return await taskService.findById(request.params.id);
}

exports.save = async (request, h) => {
	const task = await taskService.save(request.params.id, request.auth.credentials.id, request.payload);
	return { message: "Task is saved successfully.", task: task };
}

exports.delete = async (request, h) => {
	return await taskService.delete(request.params.id);
}

exports.verifyUniqueTitle = async (request, h) => {
	const task = await taskService.findByTitle(request.payload.title);
	if (task) {
		throw Boom.badRequest('Title is duplicated');
	}

	return h.continue;
}