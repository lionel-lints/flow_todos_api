import knex from 'knex';
import config from '../knexfile';

export default (callback) => {
  const environment = process.env.NODE_ENV || 'development';
  const Knex = knex(config[environment]);

  callback(Knex);
};

