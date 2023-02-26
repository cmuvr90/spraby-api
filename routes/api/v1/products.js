import ProductController from '../../../controllers/v1/ProductController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/products/list', auth, ProductController.index);
  router.get('/products/:handle', auth, ProductController.get);
  router.post('/products/save', auth, ProductController.create);
  router.put('/products/:id/save', auth, ProductController.update);
  router.delete('/products/:id', auth, ProductController.delete);
}
