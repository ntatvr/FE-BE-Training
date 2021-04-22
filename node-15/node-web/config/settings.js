const { Store } = require('@hapipal/confidence');
const { env } = process;

const settings = {
  'port': {
    $filter: 'env',
    $default: 5000,
    local: 5000,
    production: 5001,
  },
  'host': {
    $filter: 'env',
    $default: 'localhost',
    local: 'localhost',
    production: '127.0.0.1',
  },
  'logLevel': {
    $filter: 'env',
    $default: 'error',
    local: 'info',
    production: 'error',
  },
  'authAPI': {
    $filter: 'env',
    $default: 'http://localhost:3000',
    local: 'http://localhost:3000',
    production: 'http://localhost:3001',
  },
  'coreAPI': {
    $filter: 'env',
    $default: 'http://localhost:4000',
    local: 'http://localhost:4000',
    production: 'http://localhost:4001',
  }
}
const store = new Store(settings);

module.exports = {
  settings: store.get('/', {env: env.NODE_ENV})
}