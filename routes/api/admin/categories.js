import CategoryController from '../../../controllers/admin/CategoryController';
import {auth, manager} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/categories', auth, manager, CategoryController.index);
  router.get('/categories/:id', auth, CategoryController.get);

  router.post('/categories', auth, CategoryController.create);
  router.put('/categories/:id', auth, CategoryController.update);
  router.delete('/categories/:id', auth, CategoryController.delete);
}
