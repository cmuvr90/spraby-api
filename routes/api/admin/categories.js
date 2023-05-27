import CategoryController from '../../../controllers/admin/CategoryController';
import {admin, auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/categories', auth, admin, CategoryController.index);
  router.get('/categories/:id', auth, admin, CategoryController.get);

  router.post('/categories', auth, admin, CategoryController.create);
  router.put('/categories/:id', auth, admin, CategoryController.update);
  router.delete('/categories/:id', auth, admin, CategoryController.delete);
}
