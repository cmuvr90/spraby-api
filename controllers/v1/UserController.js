import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class UserController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    const UserService = this.getService(TYPES.UserService);
    const users = await UserService.user.get();

    try {
      return this.successResponse(users, true);
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
