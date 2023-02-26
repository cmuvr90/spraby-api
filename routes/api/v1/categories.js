import CategoryController from '../../../controllers/v1/CategoryController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/categories/list', auth, CategoryController.index);
  router.get('/categories/:handle', auth, CategoryController.get);
  router.post('/categories/save', auth, CategoryController.create);
  router.put('/categories/:id/save', auth, CategoryController.update);
  router.delete('/categories/:id', auth, CategoryController.delete);
}
