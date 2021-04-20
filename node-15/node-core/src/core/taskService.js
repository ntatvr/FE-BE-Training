const Task =  require('./task');
const TaskErrors =  require('./taskErrors');
const Boom = require('@hapi/boom');

async function findById(taskId) {
	const task = await Task.findById(taskId);
	if (!task) {
		throw Boom.badRequest(TaskErrors.NOT_FOUND);
	}
	return task;
}

exports.findByTitle = async (title) => {
	return await Task.findOne({ title: title}).catch(e => {
		throw Boom.badRequest(e.message);
	});
}

exports.findById = async (taskId) => {
	return await findById(taskId);
}

exports.find = async (userId, pageOptions) => {

	const tasks = await Task.find({ $or: [{reporter: userId}, {assignee: userId}]})
		.skip(pageOptions.page * pageOptions.size)
		.limit(pageOptions.size)
		.select('-__v')
		.catch((err) => {throw Boom.badRequest(err.message)}
	);

	const total = await Task.find({ $or: [{reporter: userId}, {assignee: userId}]})
		.countDocuments()
		.catch((err) => {throw Boom.badRequest(err.message)}
	);
	console.log(total);
	
	return {
		data: tasks,
		total: total,
		page: pageOptions.page + 1,
		size: pageOptions.size,
		hasMore: (total > tasks.length + (pageOptions.page * pageOptions.size))
	};
}

exports.save = async (taskId, reporter, payload) => {
	if (!payload) {
        throw Boom.badRequest(TaskErrors.BODY_IS_MISSING);
	}

	var taskData = new Task();
	if (taskId) {
		taskData = await findById(taskId);

		if (taskData.reporter !== reporter) {
			throw Boom.forbidden(TaskErrors.FORBIDDEN);
		}
	}

	taskData.title = payload.title;
	taskData.description = payload.description;
	taskData.reporter = reporter;
	taskData.assignee = payload.assignee;
	taskData.status = payload.status;

	await taskData.save().catch(e => {
		throw Boom.badRequest(e.message);
	});
	
	return taskData;
}

exports.delete = async (taskId) => {
	await (await findById(taskId)).deleteOne();
	return {success: true};
}