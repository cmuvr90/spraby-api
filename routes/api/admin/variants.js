import VariantController from '../../../controllers/admin/VariantController';
import {auth, manager} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/variants/list', auth, manager, VariantController.index);
  router.post('/variants/save', auth, manager, VariantController.create);
  router.delete('/variants/:id', auth, manager, VariantController.delete);
}
