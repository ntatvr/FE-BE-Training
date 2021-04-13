'use strict';
require('dotenv').config();
const Glue = require('@hapi/glue');
const Manifest = require('../manifest-config.js');
const Boom = require('@hapi/boom');
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:30001/fake_dindin';

const context = {
    title: 'My Fake DinDin site'
};

const blockIps = function(request, h) {
    const ip = request.info.remoteAddress;
    console.log('blockIps: ' + ip);
    //throw Boom.forbidden('try again some time');
    return h.continue;
}

const startServer = async () => {

    const server = await Glue.compose(Manifest, {relativeTo: __dirname});

    // const mean = function(values, next) {
    //     const sum = values.reduce((a, b) => a + b);
    //     return next(null, sum / values.length);
    // }

    // server.method('mean', mean, {});
    server.ext('onRequest', blockIps);


    let hbs = require('handlebars');
    hbs.registerHelper("inc", function(value, options) {
        return parseInt(value) + 1;
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

    // Custom handler
    // server.handler('i18n-view', (route, options) => {
    //     const view = options.view;

    //     return function (request, reply) {
    //         const settings = {
    //             supportedLanguages: ['en', 'fr'],
    //             defaultLanguage: 'en'
    //         };
    //         const langs = Accept.languages(request.headers['accept-language']);
    //         for (let i = 0; i < langs.length; i++) {
    //             console.log(langs[i]);
    //             if (settings.supportedLanguages.indexOf(langs[i]) !== -1) {
    //                 return reply.view(view + '_' + langs[i]);
    //             }
    //         }

    //         return reply.view(view + '_' + settings.defaultLanguage);
    //     };
    // });

    server.route(require('./routes'));

    await server.start();

    // Once started, connect to Mongo through Mongoose
    mongoose.connect(MongoDBUrl, {}).then(() => {
        console.log('Connected to Mongo server');
    }, err => {console.log(err)});

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

process.on('unhandledException', (err) => {
    console.log(err);
    process.exit(1);
});

startServer();