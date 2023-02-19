import CategoryController from '../../../controllers/v1/CategoryController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/categories/list', auth, CategoryController.index);
  router.get('/categories/:handle', auth, CategoryController.get);
}
