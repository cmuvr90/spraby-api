import CategoryController from '../../../controllers/v1/CategoryController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/categories/list', CategoryController.index);
}
