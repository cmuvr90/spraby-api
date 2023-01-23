import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class OptionController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    const OptionService = this.getService(TYPES.OptionService);
    const options = await OptionService.option.get();

    try {
      return this.successResponse(options, true);
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
