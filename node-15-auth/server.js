'use strict';
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const Glue = require('@hapi/glue');
const Manifest = require('./config/manifest');
const secret = require('./config/secret');
const userService =  require('./src/auth/userService');
const Bcrypt = require('bcrypt');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const validate = async (request, username, password, h) => {
    const user = await userService.findByUsername(username);
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, username: user.username, scope: user.scope };
    return { isValid, credentials };
};

const validateToken = async function (credentials, request, h) {
    const user = await userService.findByUsername(credentials.username);
    if (!user) {
        return { isValid: false };
    }

    return { isValid: user.id === credentials.id };
};

const init = async () => {
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
    return server;
}

exports.init = async () => {
    return init();
}

exports.start = async () => {
    const server = await init();

    const swaggerOptions = {
        info: {
            title: 'Auth API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

	await server.start();
    console.log('Server running on %s', server.info.uri);
    return server;
}

process.on('unhandledRejection', (err) => {
    console.log("[unhandledRejection] " + err);
    process.exit(1);
});
