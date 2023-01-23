import {VariantController} from '../../../controllers/v1/VariantController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/variants/list`, (req, res) => new VariantController(req, res).index());
}
