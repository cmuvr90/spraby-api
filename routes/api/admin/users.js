import UserController from '../../../controllers/admin/UserController';
import {LoginRequest, RegisterRequest} from '../../../requests';
import {admin, auth} from '../../../middlewares';

/**
 *
 * @param router
 */
export default function (router) {
  router.post('/users/login', LoginRequest, UserController.login);
  router.post('/users/logout', UserController.logout);
  router.post('/users/register', RegisterRequest, UserController.register);
  router.get('/users/refresh', UserController.refresh);
  router.get('/users/auth-user', UserController.getAuthUser);

  router.get('/users', auth, admin, UserController.index);
  router.get('/users/:id', auth, admin, UserController.get);
  router.post('/users', auth, admin, UserController.create);
  router.put('/users/:id', auth, admin, UserController.update);
  router.delete('/users/:id', auth, admin, UserController.delete);
}
