import VariantController from '../../../controllers/v1/VariantController';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/variants/list', VariantController.index);
}
