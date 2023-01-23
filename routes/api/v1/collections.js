import {CollectionController} from '../../../controllers/v1/CollectionController';

/**
 *
 * @param app
 * @param prefix
 */
export default function (app, prefix) {
  app.get(`${prefix}/collections/list`, (req, res) => new CollectionController(req, res).index());
}
