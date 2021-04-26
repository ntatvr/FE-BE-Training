'use strict';
const taskService = require('./taskService');
const authService = require('../auth/authService');

exports.createTask = async (request, h) => {

	if (!request.auth.isAuthenticated) {
        return h.redirect('/login');
    }

	const createTaskRes = await taskService.createTask(request.auth.credentials, request.payload);
	if (createTaskRes.status !== 200) {
		var errors = {title: createTaskRes.data.message};
		if (createTaskRes.data.errors) {
			errors = createTaskRes.data.errors;
		}

        return h.view('tasks', {
	        errors: errors,
	        values: request.payload,
	        pageHeader: 'Create Task',
	        tasks: JSON.parse(request.payload.tasks),
			users: JSON.parse(request.payload.users)
	    }).code(createTaskRes.status).takeover();
    }

    const tasks = JSON.parse(request.payload.tasks);
    tasks.push(createTaskRes.data.task);
    return h.view('tasks', {
        pageHeader: 'Create Task',
        tasks: tasks,
		users: JSON.parse(request.payload.users)
    });
}

exports.getTasks = async (request, h) => {
	if (!request.auth.isAuthenticated) {
        return h.redirect('/login');
    }

    const getTaskRes = await taskService.getTasks(request.auth.credentials);

    if (getTaskRes.status === 200) {
    	var tasks = getTaskRes.data.data;
    }

    const getUserRes = await authService.getUsers(request.auth.credentials);

    if (getUserRes.status === 200) {
    	var users = getUserRes.data.users;
    }

	return h.view('tasks', {
		pageHeader: 'Create Task',
		tasks: tasks,
		users: users
	});
}