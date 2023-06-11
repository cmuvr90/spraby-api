import NavigateController from '../../../controllers/admin/NavigateController';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/navigations/:type', auth, NavigateController.get);
  router.post('/navigations', auth, NavigateController.create);
  router.put('/navigations/:id', auth, NavigateController.update);
}
