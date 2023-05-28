import BrandController from '../../../controllers/admin/BrandController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/brands', auth, BrandController.index);
  router.get('/brands/:id', auth, BrandController.get);

  router.post('/brands', auth, BrandController.create);
  router.put('/brands/:id', auth, BrandController.update);
  router.delete('/brands/:id', auth, BrandController.delete);
}
