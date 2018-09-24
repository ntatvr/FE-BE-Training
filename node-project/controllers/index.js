const coreCtrl = require('./core.server.controller');
const userCtrl = require('./core.server.controller.user');
const emailCtrl = require('./core.server.controller.email');

module.exports = {
	CoreCtrl : coreCtrl,
	UserCtrl: userCtrl,
	EmailCtrl: emailCtrl
}