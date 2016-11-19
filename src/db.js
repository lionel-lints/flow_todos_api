import config from '../knexfile';
import knex from 'knex';

export default callback => {
  const environment = process.env.NODE_ENV || 'development';
  const Knex = knex(config[environment]); 

  callback(Knex);
}

