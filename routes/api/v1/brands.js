import {BrandController} from '../../../controllers/v1/BrandController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/brands/list`, (req, res) => new BrandController(req, res).index());
}
