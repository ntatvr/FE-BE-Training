const { Store } = require('@hapipal/confidence');
const { env } = process;

const settings = {
  "port": {
    $filter: 'env',
    $default: 3000,
    production: 3001,
  },
}
const store = new Store(settings);

module.exports = {
  settings: store.get('/', {env: env.NODE_ENV})
}