import {OptionController} from '../../../controllers/v1/OptionController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/options/list`, (req, res) => new OptionController(req, res).index());
}
