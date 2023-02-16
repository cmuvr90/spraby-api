import UserController from '../../../controllers/v1/UserController';
import {LoginRequest, RegisterRequest} from '../../../requests';
import {auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/users/list', auth, UserController.index);
  router.post('/users/login', LoginRequest, UserController.login);
  router.post('/users/logout', UserController.logout);
  router.post('/users/register', RegisterRequest, UserController.register);
  router.get('/users/refresh', UserController.refresh);
  router.get('/users/auth-user', UserController.getAuthUser);
}
