import resource from 'resource-router-middleware';
import users from '../models/users';

/* eslint-disable no-unused-vars*/
/* eslint-disable arrow-body-style */
export default ({ config, db }) => resource({
  /* Property name to store preloaded entity on `request`. */
  id: 'user',

  /* For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    const user = users(db).where({ id });
    const err = user ? null : 'Not found';
    callback(err, user);
  },

  /* GET / - List all entities */
  index({ params }, res) {
    users(db).select().then((usersArray) => {
      res.json(usersArray);
    });
  },

  /* POST / - Create a new entity */
  create({ body }, res) {
    users(db).insert(body).returning('id').then(() => {
      res.status(201).json(body);
    });
  },

  /* GET /:id - Return a given entity */
  read({ user }, res) {
    user.select().then((returnedUser) => {
      res.json(returnedUser);
    });
  },

  /* PUT /:id - Update a given entity */
  update({ user, body }, res) {
    const updatedUser = {};
    const returnArray = ['id'];
    const keyArray = Object.keys(body).filter((key) => {
      return key !== 'id';
    });

    for (const key of keyArray) {
      updatedUser[key] = body[key];
      returnArray.push(key);
    }

    if (body.id !== user.id) {
      res.status(422).json({ error: 'You cannot update the id field.' });
    } else {
      user.returning(returnArray).update(updatedUser).then((returnedUser) => {
        res.json(returnedUser);
      });
    }
  },

  /* DELETE /:id - Delete a given entity */
  delete({ user }, res) {
    user.del().then((status) => {
      res.sendStatus(204);
    });
  },
});
