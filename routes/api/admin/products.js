import ProductController from '../../../controllers/admin/ProductController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.post('/products/create', auth, ProductController.create);
  router.get('/products/list', auth, ProductController.index);
  router.get('/products/:id', auth, ProductController.get);

  router.post('/products/save', auth, ProductController.create);
  router.put('/products/:id/save', auth, ProductController.update);
  router.delete('/products/:id', auth, ProductController.delete);
}
