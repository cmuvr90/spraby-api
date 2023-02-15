import CollectionController from '../../../controllers/v1/CollectionController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/collections/list', auth, CollectionController.index);
}
