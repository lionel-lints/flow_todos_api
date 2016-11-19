import resource from 'resource-router-middleware';
import users from '../models/users';

export default ({ config, db }) => resource({
  /** Property name to store preloaded entity on `request`. */
  id : 'user',

  /* For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {

    let user = users(db).where({id: id});
    let err = user ? null : 'Not found';
    callback(err, user);
  },

  /** GET / - List all entities */
  index({ params }, res) {
    users(db).select().then( usersArray => {
      res.json(usersArray);
    });
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    users(db).insert(body).returning('id').then( user => {
      res.json(body);
    });
  },

  /** GET /:id - Return a given entity */
  read({ user }, res) {
    user.select().then( returnedUser => {
      res.json(returnedUser);
    });
  },

  /** PUT /:id - Update a given entity */
  update({ user, body }, res) {
    let updatedUser = {};
    for (let key in body) {
      if (key!=='id') {
        updatedUser[key] = body[key];
      }
    }
    user.update(updatedUser).then( returnedUser => {
      res.json(returnedUser);
    })
  },

  /** DELETE /:id - Delete a given entity */
  delete({ user }, res) {
    user.del().then( status => {
      res.sendStatus(200);
    });
  }
});
