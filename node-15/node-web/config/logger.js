const winston = require('winston');
const { settings } = require('./settings.js')

const logger = winston.createLogger({
  level: settings.logLevel,
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/app.log' }),
  ],
});

module.exports = logger;