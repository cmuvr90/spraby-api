import UserController from '../../../controllers/admin/UserController';
import {LoginRequest, RegisterRequest} from '../../../requests';
import {auth} from '../../../middlewares';

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

  router.get('/users', auth, UserController.index);
  router.get('/users/:id', auth, UserController.get);
  router.post('/users', auth, UserController.create);
  router.put('/users/:id', auth, UserController.update);
  router.delete('/users/:id', auth, UserController.delete);
}
