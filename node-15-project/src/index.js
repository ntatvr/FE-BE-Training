'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const MongoDBUrl = 'mongodb://localhost:30001/fake_dindin';

const context = {
    title: 'My Fake DinDin site'
};

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const mean = function(values, next) {
        const sum = values.reduce((a, b) => a + b);
        return next(null, sum / values.length);
    }

    server.method('mean', mean, {});
    
    await server.register(require('@hapi/vision'));
    server.views({
        engines: {
            html: require('handlebars')
        },
        context,
        relativeTo: __dirname,
        path: 'templates',
        //layout: true,
        //layoutPath: 'templates/layout'
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

init();