'use strict';
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Glue = require('@hapi/glue');
const Manifest = require('./config/manifest');
const secret = require('./config/secret');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const authService = require('./src/auth/authService');

const validateToken = async function (credentials, request, h) {

    const isValidUserId = await authService.isValidUserId(credentials.id, request.auth.token);

    if (isValidUserId) {
        return { isValid: true };
    }

    return { isValid: false };
};

const init = async () => {
    const server = await Glue.compose(Manifest, {relativeTo: __dirname});

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
            title: 'Core API Documentation',
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
