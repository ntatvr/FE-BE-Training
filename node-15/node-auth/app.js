'use strict';
const mongoose = require('mongoose');
const server = require('./server');
const { settings } = require('./config/settings.js')

const startServer = async () => {
	await server.start();

	/* Connect to the database */
	const mongoDBUrl = settings.mongoDBUrl;
	mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
		.then(() => {console.log('Connected to Mongo server')}, err => {console.log(err)});
}

startServer();