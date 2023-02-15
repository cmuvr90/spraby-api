import ProductController from '../../../controllers/v1/ProductController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/products/list', auth, ProductController.index);
}
