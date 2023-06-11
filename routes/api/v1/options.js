import OptionController from '../../../controllers/v1/OptionController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/options/list', auth, OptionController.index);
  router.get('/options/:id', auth, OptionController.get);
  router.post('/options/save', auth, OptionController.create);
  router.put('/options/:id/save', auth, OptionController.update);
  router.delete('/options/:id', auth, OptionController.delete);
}
