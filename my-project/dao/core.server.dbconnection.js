"user strict";

const mysql = require('mysql');
const config = require('../config');

var connection = mysql.createPool({
	host: config.db_host,
 	port: config.db_port,
  	user: config.db_user,
  	password: config.db_password
});

module.exports = connection
