import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import users from './users';
import todos from './todos';
import tags from './tags';
import categories from './categories';
import evaluations from './evaluations';

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use('/users', users({ config, db }));
  
  api.use('/todos', todos({ config, db }));
  
  api.use('/tags', tags({ config, db }));
  
  api.use('/categories', categories({ config, db }));
  
  api.use('/evaluations', evaluations({ config, db }));
  
  api.use('/facets', facets({ config, db }));
  
  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}
