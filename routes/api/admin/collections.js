import CollectionController from '../../../controllers/admin/CollectionController';
import {admin, auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/collections', auth, admin, CollectionController.index);
  router.get('/collections/:id', auth, admin, CollectionController.get);

  router.post('/collections', auth, admin, CollectionController.create);
  router.put('/collections/:id', auth, admin, CollectionController.update);
  router.delete('/collections/:id', auth, admin, CollectionController.delete);
}
