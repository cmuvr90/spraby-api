import ProductController from '../../../controllers/v1/ProductController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/products/:id', ProductController.get);
  router.get('/products', ProductController.index);
}
