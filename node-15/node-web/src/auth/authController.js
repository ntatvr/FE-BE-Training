'use strict';
const authService = require('./authService');


exports.login = async (request, h) => {
	const { username, password } = request.payload;
	const res = await authService.getUserToken(username, password);
	if (res.status !== 200) {

		const errors = {username: res.data.message};
        return h.view('login', {
	        errors: errors,
	        values: request.payload
	    }).code(res.status).takeover();
    }

	request.cookieAuth.set({ token: res.data.token });
	return h.redirect('/tasks');
}

exports.logout = async (request, h) => {
	request.cookieAuth.clear();
    return h.redirect('/login');
}