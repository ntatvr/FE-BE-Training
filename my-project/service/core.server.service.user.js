var dbConnection = require('../dao').dbConnection;

var userModel = {
	getAllUser: function(callback) {
		var sql = 'SELECT * FROM `nodejs-training`.user';
		return dbConnection.query(sql, callback);
	},
	getUserById: function(id, callback) {
		var sql = 'SELECT * FROM `nodejs-training`.user WHERE iduser = ?';
		return dbConnection.query(sql, [id], callback);
	},
	addUser: function(user, callback) {
		var sql = 'INSERT INTO `nodejs-training`.user(username, password, isActive) values(?,?,?)';
		return dbConnection.query(sql, [user.username, user.password, user.isActive], callback);
	},
	updateUser: function(user, callback) {
		var sql = 'UPDATE `nodejs-training`.user set username = ?, password = ?, isActive = ? WHERE iduser = ?';
		return dbConnection.query(sql, [user.username, user.password, user.isActive, user.iduser], callback);
	},
	deleteUser: function(id, callback) {
		var sql = 'DELETE FROM `nodejs-training`.user WHERE iduser = ?';
		return dbConnection.query(sql, [id], callback);
	}
}

module.exports = userModel;