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
const logger = require('./config/logger');
const laabr = require('laabr');
const fs = require('fs');

const laabrOptions = {
    formats: { onPostStart: ':time :start :level :message' },
    tokens: { start:  () => '[start]' },
    indent: 0
};

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

    await server.register({
        plugin: laabr,
        options: laabrOptions,
    });

    server.events.on('response', function (request) {
        logger.info(request.info.remoteAddress 
            + ': ' 
            + request.method.toUpperCase() 
            + ' ' 
            + request.path 
            + ' --> ' 
            + request.response.statusCode);
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


    server.ext('onPreResponse', (request, h) => {
        const response = request.response;
        if (response.isBoom && response.output.payload.statusCode === 500) {
            const output = response.output;
            const errorObject = {
                error: output.payload.error,
                statusCode: output.payload.statusCode,
                message: output.payload.message,
                details: response.details,
            }

            return h.response(errorObject).code(output.statusCode).takeover();
        }

        return h.continue;
    });

	await server.start();

    await fs.writeFile('log/app.log', '', function() {});
    await fs.writeFile('log/error.log', '', function() {});

    console.log('Server running on %s', server.info.uri);
    logger.info('Server running on %s', server.info.uri);
    return server;
}

process.on('unhandledRejection', (err) => {
    console.log("[unhandledRejection] " + err);
    process.exit(1);
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

