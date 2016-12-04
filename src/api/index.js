import { Router as router } from 'express';
import { version } from '../../package.json';
import users from './users';
//import todos from './todos';

export default ({ config, db }) => {
  const api = router();
  const userRouter = router({ mergeParams: true });
  const todoRouter = router({ mergeParams: true });

  // mount the resources
  // userRouter.use('users/:id/todos', (req, res, next) => {
  // console.log('hitting this route?');
  // next();
  // }, todoRouter);

  // todoRouter.use('/', todos({ config, db }));
  userRouter.use('/users', users({ config, db }));


  api.use(userRouter);

    // perhaps expose some API metadata at the root
  api.get('/version', (req, res) => {
    res.json({ version });
  });

  return api;
};
