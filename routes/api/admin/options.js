import OptionController from '../../../controllers/admin/OptionController';
import {admin, auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/options/list', auth, admin, OptionController.index);
  router.get('/options/:id', auth, admin, OptionController.get);
  router.post('/options/save', auth, admin, OptionController.create);
  router.put('/options/:id/save', auth, admin, OptionController.update);
  router.delete('/options/:id', auth, admin, OptionController.delete);
}
