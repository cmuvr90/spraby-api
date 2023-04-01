import VariantController from '../../../controllers/admin/VariantController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/variants/list', auth, VariantController.index);
  router.post('/variants/save', auth, VariantController.create);
  router.delete('/variants/:id', auth, VariantController.delete);
}
