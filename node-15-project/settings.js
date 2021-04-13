const { Store } = require('@hapipal/confidence');
const { env } = process;

const settings = {
  "port": {
    $filter: 'env',
    $default: 3000,
    development: 3001,
    qa: 3002,
    production: 3003,
  },
}
const store = new Store(settings);

module.exports = {
  settings: store.get('/', {env: process.env.NODE_ENV})
}