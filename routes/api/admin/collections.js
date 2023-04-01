import CollectionController from '../../../controllers/admin/CollectionController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/collections/list', auth, CollectionController.index);
  router.get('/collections/:handle', auth, CollectionController.get);
  router.post('/collections/save', auth, CollectionController.create);
  router.put('/collections/:id/save', auth, CollectionController.update);
  router.delete('/collections/:id', auth, CollectionController.delete);
}
