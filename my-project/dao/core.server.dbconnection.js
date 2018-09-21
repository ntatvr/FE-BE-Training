"user strict";

const mysql = require('mysql');

var connection = mysql.createPool({
	host: '127.0.0.1',
 	port: '3306',
  	user: "root",
  	password: ""
});

module.exports = connection
