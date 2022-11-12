import {UserController} from '../../../controllers/v1/userController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/users`, (req, res) => new UserController(req, res).index());
}
