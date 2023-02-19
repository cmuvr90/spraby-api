import OptionController from '../../../controllers/v1/OptionController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/options/list', auth, OptionController.index);
  router.get('/options/:id', auth, OptionController.get);
}
