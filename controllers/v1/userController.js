import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class UserController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    const UserService = this.getService(TYPES.UserService);
    const data = await UserService.user.findPrepare();

    try {
      return await this.successResponse(data, true);
    } catch (e) {
      return await this.errorResponse(e);
    }
  }
}
