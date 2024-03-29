import ProductController from '../../../controllers/admin/ProductController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/products', auth, ProductController.index);
  router.get('/products/:id', auth, ProductController.get);

  router.post('/products', auth, ProductController.create);
  router.put('/products/:id', auth, ProductController.update);
  router.delete('/products/:id', auth, ProductController.delete);

  router.post('/products/:id/images', auth, ProductController.createImages);
  router.put('/products/:id/images/:imageId/main', auth, ProductController.setMainImage);
  router.delete('/products/:id/images', auth, ProductController.deleteImages);

  router.post('/products/:id/variants', auth, ProductController.createVariant)
  router.put('/products/:productId/variants/:variantId', auth, ProductController.updateVariant)
  router.delete('/products/:productId/variants/:variantId', auth, ProductController.deleteVariant)
}
