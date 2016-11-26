import resource from 'resource-router-middleware';
import users from '../models/users';
import todos from '../models/todos';

/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
export default ({ config, db }) => resource({
  /* Property name to store preloaded entity on `request`. */
  id: 'todo',
  // userId: 'user',

  /* For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, userId, callback) {    
    const user = users(db).where({ userId });
    const todo = todos(db).where({ id }).andWhere('user', userId);
    const err = todo && user ? null : 'Not found';
    callback(err, todo);
  },

  /* GET / - List all entities */
  index({ params }, res) {
    todos(db).select().then((usersTodoArray) => {
      res.json(usersTodoArray);
    });
  },

  /* POST / - Create a new entity */
  create({ body }, res) {
    todos(db).insert(body).returning('id').then(() => {
      res.json(body);
    });
  },

  /* GET /:id - Return a given entity */
  read({ todo }, res) {
    todo.select().then((returnedUser) => {
      res.json(returnedUser);
    });
  },

  /* PUT /:id - Update a given entity */
  update({ todo, body }, res) {
    const updatedUser = {};
    const keyArray = Object.keys(body).filter((key) => {
      return key !== 'id';
    });

    for (const key of keyArray) {
      updatedUser[key] = body[key];
    }

    todo.update(updatedUser).then((returnedUser) => {
      res.json(returnedUser);
    });
  },

  /* DELETE /:id - Delete a given entity */
  delete({ todo }, res) {
    todo.del().then((status) => {
      res.sendStatus(status);
    });
  },
});
