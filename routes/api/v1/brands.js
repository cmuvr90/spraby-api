import BrandController from '../../../controllers/v1/BrandController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/brands/list', auth, BrandController.index);
  router.get('/brands/:id', auth, BrandController.get);
  router.post('/brands/save', auth, BrandController.create);
  router.post('/brands/:id/save', auth, BrandController.update);
}
