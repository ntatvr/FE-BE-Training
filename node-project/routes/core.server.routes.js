/**
* @module routes
* @description
* Define all core routes of applications
*/
"user strict";

const coreCtrl = require('../controllers').CoreCtrl;
const userCtrl = require('../controllers').UserCtrl;
const emailCtrl = require('../controllers').EmailCtrl;

module.exports = function(app) {
	// Pages
	app.route('/').get(coreCtrl.renderHomePage);
	app.route('/user').get(coreCtrl.renderUserPage);
	app.route('/sendMail').get(coreCtrl.renderSendMailPage);

	// APIs
	app.route('/user/getAll').get(userCtrl.getAllUser);
	app.route('/user/:id?').get(userCtrl.getUserById);
	app.route('/user/add').post(userCtrl.addUser);
	app.route('/user/delete').post(userCtrl.deleteUser);
	app.route('/user/insert').post(userCtrl.insertUser);
	app.route('/user/remove/:id?').get(userCtrl.removeUser);
	
	app.route('/sendMail').post(emailCtrl.sendMail);
};