require('dotenv').config()
// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_URL_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: { directory: './db/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.PG_URL_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: { directory: './db/seeds' },
  },
}
