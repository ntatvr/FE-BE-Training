const dbConnection = require('./core.server.dbconnection');
const email = require('./core.server.emailconnection');

module.exports = {
	dbConnection: dbConnection,
	getTransporter: email.getTransporter,
	getMailOptions: email.getMailOptions
}