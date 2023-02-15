import BrandController from '../../../controllers/v1/BrandController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/brands/list', auth, BrandController.index);
}
