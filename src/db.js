import knex from 'knex';
import env from 'dotenv';
import config from '../knexfile';

export default (callback) => {
  env.load();
  const environment = process.env.NODE_ENV || 'development';
  const Knex = knex(config[environment]);

  callback(Knex);
};

