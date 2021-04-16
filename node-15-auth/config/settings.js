const { Store } = require('@hapipal/confidence');
const { env } = process;

const settings = {
  'port': {
    $filter: 'env',
    $default: 3000,
    local: 3000,
    production: 3001,
  },
  'host': {
    $filter: 'env',
    $default: 'localhost',
    local: 'localhost',
    production: '127.0.0.1',
  },
  'mongoDBUrl': {
    $filter: 'env',
    $default: 'mongodb://localhost:30001/auth',
    local: 'mongodb://localhost:30001/auth',
    production: 'mongodb://127.0.0.1:30001/auth',
  },
}
const store = new Store(settings);

module.exports = {
  settings: store.get('/', {env: env.NODE_ENV})
}