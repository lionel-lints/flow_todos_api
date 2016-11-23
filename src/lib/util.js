
/* Creates a callback that proxies node callback style arguments to an Express Response object.
 *
 * @param {express.Response} res      Express HTTP Response
 * @param {number} [status=200]       Status code to send on success
 *
 * @example
 *   list(req, res) {
 *     collection.find({}, toRes(res));
 *   }
 */

export default {
  toRes(res, status = 200) {
    return (err, data) => {
      if (err) return res.status(500).send(err);

      let tempData = data;
      if (data && typeof data.toObject === 'function') {
        tempData = data.toObject();
      }
      res.status(status).json(tempData);
    };
  },
};
