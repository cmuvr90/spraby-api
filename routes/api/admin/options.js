import OptionController from '../../../controllers/admin/OptionController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/options', auth, OptionController.index);
  router.get('/options/:id', auth, OptionController.get);

  router.post('/options', auth, OptionController.create);
  router.put('/options/:id', auth, OptionController.update);
  router.delete('/options/:id', auth, OptionController.delete);
}
