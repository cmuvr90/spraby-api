import {BrandController} from '../../../controllers/v1/brandController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/brands`, (req, res) => new BrandController(req, res).index());
}
