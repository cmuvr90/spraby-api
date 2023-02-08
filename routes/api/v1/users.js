import UserController from '../../../controllers/v1/UserController';
import {LoginRequest} from '../../../requests/LoginRequest';

/**
 *
 * @param router
 */
export default function (router) {
  router.get('/users/list', UserController.index);
  router.post('/users/login', LoginRequest, UserController.login);
}
