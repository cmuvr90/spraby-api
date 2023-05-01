import CollectionController from '../../../controllers/admin/CollectionController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/collections', auth, CollectionController.index);
  router.get('/collections/:id', auth, CollectionController.get);

  router.post('/collections', auth, CollectionController.create);
  router.put('/collections/:id', auth, CollectionController.update);
  router.delete('/collections/:id', auth, CollectionController.delete);
}
