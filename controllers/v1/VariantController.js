import {Controller} from '..';
import {TYPES} from '../../ioc/types';

export class VariantController extends Controller {

  /**
   *
   * @returns {Promise<*>}
   */
  index = async () => {
    const VariantService = this.getService(TYPES.VariantService);
    const variants = await VariantService.variant.get();

    try {
      return this.successResponse(variants, true);
    } catch (e) {
      return this.errorResponse(e);
    }
  }
}
