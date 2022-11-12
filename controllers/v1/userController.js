import {Controller} from '..';
// import {TYPES} from '../../ioc/types';

export class UserController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    // const UserService = this.getService(TYPES.UserService);
    // const log = this.getService(TYPES.LogService).createLogger();

    try {
      return this.successResponse();
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
