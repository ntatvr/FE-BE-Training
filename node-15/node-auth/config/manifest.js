  
const { settings } = require('./settings.js')

const manifest = {
    server: {
    	host: settings.host,
        port: settings.port,
        app: {
            title: 'Auth'
        }
    }
}

module.exports = manifest