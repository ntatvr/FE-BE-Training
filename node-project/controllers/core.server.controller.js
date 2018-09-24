"user strict";
const userService = require('../service');
const utils = require('../utils').Utils;

// Module public methods.
module.exports = {
	renderHomePage : renderHomePage,
	renderUserPage  : renderUserPage,
	renderSendMailPage: renderSendMail
};

/**
* @name renderHomePage
* @description
* Render homepage.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderHomePage(req, res) {
	var currentPage;
	if (req.url === '/') {
		currentPage = 'home';
	}

	res.render('homepage', {
	    title : 'HOMEPAGE',
	    currentPage: currentPage
	});
}

/**
* @name renderUserPage
* @description
* Render user page.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderUserPage(req, res) {

	var currentPage;
	if (req.url === '/user' || req.url.includes('/user')) {
		currentPage = 'user';
	}

	if (req.query.iduser != undefined && req.query.iduser.trim() != '') {
		userService.getUserById(req.query.iduser, function(err, rows) {
			res.render('user', {
			    title : 'USER',
			    currentPage: currentPage,
			    messages: utils.getMessages(req),
			    data: utils.handleResponse(err, rows)
			});
		});
	} else {
		userService.getAllUser(function(err, rows) {
			res.render('user', {
			    title : 'USER',
			    currentPage: currentPage,
			    messages: utils.getMessages(req),
			    data: utils.handleResponse(err, rows)
			});
		});
	}
}

/**
* @name renderSendMail
* @description
* Render send mail page.
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function renderSendMail(req, res) {

	var currentPage;
	if (req.url === '/sendMail') {
		currentPage = 'sendmail';
	}

	res.render('sendmail', {
	    title : 'SEND MAIL',
	    currentPage: currentPage,
	    messages: utils.getMessages(req),
	});
}