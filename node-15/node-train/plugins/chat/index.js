'use strict';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
    	require('./consumer');
        server.route(require('./routes'));
    },
    once: true, // if true, will only register the plugin once per server.
    dependencies: [],
};