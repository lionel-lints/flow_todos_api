const path = require('path');

const config = {
  development: {
    client: 'pg',
    connection: {
      database: 'flow_todo_dev',
    },
  },
  test: {
    client: 'pg',
    connection: {
      database: 'flow_todo_test',
    },
    migrations: {
      directory: path.join(__dirname, '../db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '../db/seeds'),
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};

module.exports = config;
