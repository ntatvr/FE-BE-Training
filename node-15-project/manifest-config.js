  
const { settings } = require('./settings.js')

const manifest = {
    server: {
        port: settings.port,
        host: 'localhost',
        app: {
            title: 'Fake DinDin'
        }
    },
    register: {
        plugins: [
        	{
                plugin: '../plugins/auth',
                options: {
                    sessiontime: 500
                },
                routes: {
                    prefix: '/auth'
                }
            },
            {
                plugin: '../plugins/recipe',
                options: {
                    sessiontime: 500
                },
                routes: {
                    prefix: '/recipe'
                }
            },
            {
                plugin: '../plugins/chat',
                routes: {
                    prefix: '/chat'
                }
            }
        ],
        options: {
            once: true
        }
    }
}

module.exports = manifest