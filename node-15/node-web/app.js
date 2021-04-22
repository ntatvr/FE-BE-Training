'use strict';
const server = require('./server');
const { settings } = require('./config/settings.js')

const startServer = async () => {
	await server.start();
}

startServer();