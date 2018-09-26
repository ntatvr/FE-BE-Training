const userModel = require('./core.server.service.user');

module.exports = {
	getAllUser : userModel.getAllUser,
	getUserById: userModel.getUserById,
	addUser: userModel.addUser,
	updateUser: userModel.updateUser,
	deleteUser: userModel.deleteUser,
	getUserByEmail: userModel.getUserByEmail
}