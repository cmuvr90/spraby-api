import NavigateController from '../../../controllers/admin/NavigateController';
import {admin, auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/navigations/:type', auth, admin, NavigateController.get);
  router.post('/navigations', auth, admin, NavigateController.create);
  router.put('/navigations/:id', auth, admin, NavigateController.update);
}
