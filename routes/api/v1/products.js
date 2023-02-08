import ProductController from '../../../controllers/v1/ProductController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/products/list', ProductController.index);
}
