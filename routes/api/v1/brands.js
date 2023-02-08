import BrandController from '../../../controllers/v1/BrandController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/brands/list', BrandController.index);
}
