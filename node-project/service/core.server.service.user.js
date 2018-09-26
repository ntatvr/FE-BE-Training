var dbConnection = require('../connection').dbConnection;

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
		var sql = 'INSERT INTO `nodejs-training`.user(username, email, isActive) values(?,?,?)';
		return dbConnection.query(sql, [user.username, user.email, user.isActive], callback);
	},
	updateUser: function(user, callback) {
		var sql = 'UPDATE `nodejs-training`.user set username = ?, email = ?, isActive = ? WHERE iduser = ?';
		return dbConnection.query(sql, [user.username, user.email, user.isActive, user.iduser], callback);
	},
	deleteUser: function(id, callback) {
		var sql = 'DELETE FROM `nodejs-training`.user WHERE iduser = ?';
		return dbConnection.query(sql, [id], callback);
	},
	getUserByEmail: function(email, callback) {
		var sql = 'SELECT * FROM `nodejs-training`.user WHERE email = ?';
		return dbConnection.query(sql, [email], callback);
	}
}

module.exports = userModel;