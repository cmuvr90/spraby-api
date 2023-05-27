import BrandController from '../../../controllers/admin/BrandController';
import {auth, admin} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/brands', auth, admin, BrandController.index);
  router.get('/brands/:id', auth, admin, BrandController.get);

  router.post('/brands', auth, admin, BrandController.create);
  router.put('/brands/:id', auth, admin, BrandController.update);
  router.delete('/brands/:id', auth, admin, BrandController.delete);
}
