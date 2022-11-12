import {Controller} from '..';

export class UserController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    try {
      return this.successResponse({});
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
