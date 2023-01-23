import {UserController} from '../../../controllers/v1/UserController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/users/list`, (req, res) => new UserController(req, res).index());
}
