import {ProductController} from '../../../controllers/v1/ProductController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/products/list`, (req, res) => new ProductController(req, res).index());
}
