'use strict';
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const Glue = require('@hapi/glue');
const Manifest = require('./config/manifest');
const mongoose = require('mongoose');
const secret = require('./config/secret');
const { settings } = require('./config/settings.js')
const userService =  require('./components/auth/userService');
const Bcrypt = require('bcrypt');

const validate = async (request, username, password, h) => {
 
    const user = await userService.findByUsername(username);
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, username: user.username, scope: user.scope };
    console.log(credentials);
    return { isValid, credentials };
};

const validateToken = async function (credentials, request, h) {
    const user = await userService.findByUsername(credentials.username);
    if (!user) {
        return { isValid: false };
    }

    return { isValid: user.id === credentials.id };
};

const startServer = async () => {

	const server = await Glue.compose(Manifest, {relativeTo: __dirname});

    await server.register(require('hapi-auth-basic'));
    server.auth.strategy('basic', 'basic', { validate });

	await server.register(require('hapi-auth-jwt2'));
	server.auth.strategy('token', 'jwt', {
    	key: secret,
    	validate: validateToken,
    	verifyOptions: {
		   	ignoreExpiration: true,    // do not reject expired tokens
		   	algorithms: [ 'HS256' ]    // specify your secure algorithm
		}
  	});

	server.route(require('./routes'));

	await server.start();

    // Once started, connect to Mongo through Mongoose
    mongoose.connect(settings.mongoDBUrl, {}).then(() => {
        console.log('Connected to Mongo server');
    }, err => {console.log(err)});

    console.log('Server running on %s', server.info.uri);
}


process.on('unhandledRejection', (err) => {
    console.log("unhandledRejection: " + err);
    process.exit(1);
});

process.on('unhandledException', (err) => {
    console.log("unhandledException: " + err);
    process.exit(1);
});

startServer();
