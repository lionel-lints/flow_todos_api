import { Router as router } from 'express';
import { version } from '../../package.json';
import users from './users';
import todos from './todos';

export default ({ config, db }) => {
  const api = router();
  const todoRouter = router({mergeParams: true});

  // mount the resources
  api.use('/users', users({ config, db }));
  api.use('/:userId/todos', todoRouter.use(todos({ config, db })));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
