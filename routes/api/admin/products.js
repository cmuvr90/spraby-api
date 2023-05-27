import ProductController from '../../../controllers/admin/ProductController';
import {auth, manager} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/products', auth, manager, ProductController.index);
  router.get('/products/:id', auth, manager, ProductController.get);

  router.post('/products', auth, manager, ProductController.create);
  router.put('/products/:id', auth, manager, ProductController.update);
  router.delete('/products/:id', auth, manager, ProductController.delete);

  router.post('/products/:id/images', auth, manager, ProductController.createImages);
  router.delete('/products/:id/images', auth, manager, ProductController.deleteImages);

  router.post('/products/:id/variants', auth, manager, ProductController.createVariant)
  router.put('/products/:productId/variants/:variantId', auth, manager, ProductController.updateVariant)
  router.delete('/products/:productId/variants/:variantId', auth, manager, ProductController.deleteVariant)
}
