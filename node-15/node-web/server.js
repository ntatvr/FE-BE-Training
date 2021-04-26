'use strict';
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Glue = require('@hapi/glue');
const Manifest = require('./config/manifest');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const logger = require('./config/logger');
const laabr = require('laabr');
const fs = require('fs');

const laabrOptions = {
    formats: { onPostStart: ':time :start :level :message' },
    tokens: { start:  () => '[start]' },
    indent: 0
};

const context = {
    title: 'Web Service'
};

const validateSession = async (request, session) => {
    if (session.token) {
        return { valid: true };
    }
    return { valid: false };
};

const init = async () => {
    const server = await Glue.compose(Manifest, {relativeTo: __dirname});

    await server.register(require('@hapi/cookie'));
    server.auth.strategy('session', 'cookie', 
        {
            cookie: {
                name: 'token',
                password: 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc',
                isSecure: false,
                ttl: 600 * 1000,
            },
            redirectTo: '/login',
            validateFunc: validateSession
        }
    );
    server.auth.default('session');

    let hbs = require('handlebars');
    hbs.registerHelper("inc", function(value, options) {
        return parseInt(value) + 1;
    });
    hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

    await server.register(require('@hapi/vision'));
    server.views({
        engines: {
            hbs: hbs
        },
        context,
        relativeTo: __dirname,
        path: 'templates',
        layout: true,
        layoutPath: 'templates/layout'
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
            title: 'Web API Documentation',
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
    console.log(err);
    console.log("[unhandledRejection] " + err);
    process.exit(1);
});

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    process.exit(1);
});

