import {CategoryController} from '../../../controllers/v1/CategoryController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/categories/list`, (req, res) => new CategoryController(req, res).index());
}
