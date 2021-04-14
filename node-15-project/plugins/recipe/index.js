'use strict';
const Bcrypt = require('bcrypt');

const users = {
    ntatvr: {
        id: '607666471fb6612a1409c408',
        username: 'ntatvr',
        password: '$2b$10$WubTlopjQV/Ak5SA6CUAH.mm/LU/mZLbs9989vgrRp9obi9iZ49GO'   // 'secret'
    }
};

const validate = async (request, username, password, h) => {
 
    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }
 
    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id };
 
    return { isValid, credentials };
};

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        
		await server.register(require('hapi-auth-basic'));

	    server.auth.strategy('auth-recipe', 'basic', { validate });

        server.route(require('./routes'));
    },
    once: true, // if true, will only register the plugin once per server.
    dependencies: [],
};